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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs,
};
