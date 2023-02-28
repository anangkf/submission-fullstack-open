import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

const blog ={
  title: 'My First Blog',
  author: 'Ferdinand Dijks',
  url: 'ferdinanddijks.com/blog/j1328adj23ahd',
  likes: 2,
  user: {
    name: 'John Doe'
  }
}


describe('<Blog />', () => {
  let component;
  
  const mockHandleLike = jest.fn();
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
    );
  });

  test('renders blog title and author, but not url and number of likes by default', () => {
    const defaultBlogContent = component.container.querySelector('.blog');
    const defaultHiddenContent = component.getByTestId('blog-details');
    
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(defaultBlogContent).not.toHaveStyle('display: none');
    expect(defaultBlogContent).toBeVisible;
    expect(defaultHiddenContent).toHaveStyle('display: none');
  })
  
});
