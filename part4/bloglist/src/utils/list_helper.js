const dummy = (blogs) => blogs.length;

const totalLikes = (blogs) => {
  const arrLikes = blogs.map((blog) => blog.likes);

  return arrLikes.reduce((sum, item) => sum + item, 0);
};

module.exports = { dummy, totalLikes };
