import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const exampleBlog = {
    title: "My First Blog",
    author: "John Doe",
    url: "www.john-doe.blogspot.com/my-first-blog",
  };

  const createBlog = jest.fn();
  const toggleChildren = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} toggleChildren={toggleChildren} />
  );

  const inputTitle = component.getByLabelText("title");
  const inputAuthor = component.getByLabelText("author");
  const inputUrl = component.getByLabelText("url");
  const form = component.container.querySelector("form");

  // input and submit form data
  fireEvent.change(inputTitle, {
    target: { value: exampleBlog.title },
  });
  fireEvent.change(inputAuthor, {
    target: { value: exampleBlog.author },
  });
  fireEvent.change(inputUrl, {
    target: { value: exampleBlog.url },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(exampleBlog.title);
  expect(createBlog.mock.calls[0][0].author).toBe(exampleBlog.author);
  expect(createBlog.mock.calls[0][0].url).toBe(exampleBlog.url);
});
