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

module.exports = { dummy, totalLikes, favoriteBlog };
