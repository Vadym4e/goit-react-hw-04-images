import React from 'react';
import { Field, Form, Header } from './SearchBar.styled';
const SearchBar = ({ search }) => {
  return (
    <Header>
      <Form
        onSubmit={evt => {
          evt.preventDefault();
          const { value } = evt.target.elements.query;
          search(value);
          evt.target.reset();
          console.log(value);
        }}
      >
        <Field
          type="text"
          name="query"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

export default SearchBar;
