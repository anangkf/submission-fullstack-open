const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Author = require('./src/model/Author');
const Book = require('./src/model/Book');
const User = require('./src/model/User');

// connecting to db
require('./src/config/mongo');

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }  

  type Author {
    id: ID!
    name: String!
    born: Int
    books: [Book!]
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Query {
    allBooks(name: String, genre: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int!, 
      genres: [String!]!
    ): Book
    
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({})
        .populate('author')
      if(args.name) {
        books = books.filter((book) => book.author.name === args.name)
      }
      if(args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: async () => {
      return await Author.find({}).populate('books')
    },
    me: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('invalid jwt', {
          extensions: {
            code: 'UNAUTHORIZED',
          }
        })
      }
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('invalid jwt', {
          extensions: {
            code: 'UNAUTHORIZED',
          }
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError('Name must be at least 5 characters', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }
      if (args.author.length < 4) {
        throw new GraphQLError('Author\'s name must be at least 4 characters', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author
          }
        })
      }

      const isAuthorExist = await Author.findOne({name: args.author})
      let newAuthor;
      if (!isAuthorExist) {
        newAuthor = new Author({ name: args.author })
      }
      const author = isAuthorExist ?? newAuthor
      const book = new Book({ ...args, author: author._id })
      author.books = [ ...author.books, book._id ]
      await Promise.all([author.save(), book.save()])

      return book.populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('invalid jwt', {
          extensions: {
            code: 'UNAUTHORIZED',
          }
        })
      }

      let author = await Author.findOne({name: args.name})
      if (!author) return
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      const savedUser = await user.save()
      return savedUser
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'password123') {
        throw new GraphQLError('invalid credentials', {
          extensions: {
            code: 'UNAUTHORIZED',
            invalidArgs: user ? password : username
          }
        })
      }
      const userForToken = {
        username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})