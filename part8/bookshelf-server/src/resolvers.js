const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require('jsonwebtoken');
const Author = require("./model/Author")
const Book = require("./model/Book")
const User = require("./model/User")

const pubsub = new PubSub()

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers