const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Author = require('./src/model/Author');
const Book = require('./src/model/Book');

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

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Query {
    allBooks(name: String, genre: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int!, 
      genres: [String!]!
    ): Book
  }

  type Mutation {
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      let author = await Author.findOne({name: args.name})
      if (!author) return
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})