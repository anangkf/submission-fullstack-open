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
