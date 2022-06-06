import React from 'react';
import Search from '../components/Search.js';
import renderer from 'react-test-renderer';

// Snapshot test for component FORM

test('renders correctly', () => {
    const tree = renderer
  .create(<Search />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });