import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
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
  });

  test('renders blog url and number of likes when view button is clicked', () => {
    const button = component.getByText('show');

    fireEvent.click(button);

    const revealedContent = component.getByTestId('blog-details');
    const likes = component.container.querySelector('.likes');

    expect(revealedContent).not.toHaveStyle('display: none');
    expect(revealedContent).toBeVisible();
    expect(component.container).toHaveTextContent('likes');
    expect(likes).toHaveTextContent(blog.likes);
    expect(component.container).toHaveTextContent(blog.url);
  });

  test('clicking the like button twice calls event handler passed as a prop twice', () => {
    const button = component.getByText('like');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
  
  

});
