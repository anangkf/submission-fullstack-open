const { singleBlog, emptyList, manyBlogs } = require('../mocks/blogsMock');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const results = listHelper.dummy(singleBlog);
  expect(results).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const [item] = singleBlog;

    expect(listHelper.totalLikes(singleBlog)).toBe(item.likes);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(manyBlogs)).toBe(12);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const results = listHelper.favoriteBlog(emptyList);

    expect(results).toBe(null);
  });

  test('when list has only one blog, it should return that blog', () => {
    const [blog] = singleBlog;
    const results = listHelper.favoriteBlog(singleBlog);

    expect(results).toEqual(blog);
  });

  test('of a bigger list is calculated right', () => {
    const favBlog = {
      title: 'My Second Blog',
      author: 'Jack',
      likes: 7,
    };
    const results = listHelper.favoriteBlog(manyBlogs);

    expect(results).toEqual(favBlog);
  });
});
