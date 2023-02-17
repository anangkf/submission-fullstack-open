/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const dummy = (blogs) => blogs.length;

const totalLikes = (blogs) => {
  const arrLikes = blogs.map((blog) => blog.likes);

  return arrLikes.reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const likesCount = blogs.map(({ likes }) => likes);
  const biggestLike = Math.max(...likesCount);
  blogs.forEach((blog) => {
    delete blog._id;
    delete blog.__v;
    delete blog.url;
  });

  return blogs.find(({ likes }) => likes === biggestLike);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = blogs.map((blog) => blog.author);

  // getting author with most blogs
  const authorName = authors.reduce(
    (a, b, _, arr) => (
      arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
        ? a
        : b
    ),
    null,
  );

  // getting most blog count
  const blogCount = authors.filter((author) => author === authorName).length;

  return { name: authorName, count: blogCount };
};

const mostLikesReducer = (res, item) => {
  const { author, likes } = item;
  const isItemExist = res.find((val) => val.author === author);

  if (isItemExist) {
    res = res.map((val) => {
      if (val.author === author) {
        return { ...val, likes: val.likes + likes };
      }
      return val;
    });
  } else {
    res.push({ author, likes });
  }

  return res.sort((a, b) => b.likes - a.likes);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) {
    const [blog] = blogs;
    return { name: blog.author, likes: blog.likes };
  }

  const results = blogs.reduce(mostLikesReducer, []);
  return results.at(0);
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
