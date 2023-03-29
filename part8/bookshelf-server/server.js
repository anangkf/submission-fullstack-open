const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid');
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
    // allBooks: (root, args) => {
    //   if(args.name) {
    //     return books.filter((book) => book.author === args.name)
    //   }
    //   if(args.genre) {
    //     return books.filter((book) => book.genres.includes(args.genre))
    //   }
    //   return books
    // },
    allBooks: async () => {
      return await Book.find({})
        .populate('author')
    },
    // allAuthors: () => authors.map((author) => {
    //   const bookCount = books.filter((book) => book.author === author.name).length
    //   return {...author, bookCount}
    // }),
    allAuthors: async () => {
      return await Author.find({})
        .populate('books')
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
    editAuthor: (root, args) => {
      authors = authors.map((author) => {
        if(author.name === args.name) {
          return {...author, born: args.setBornTo}
        }
        return author
      })
      return authors.find((author) => author.name === args.name)
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