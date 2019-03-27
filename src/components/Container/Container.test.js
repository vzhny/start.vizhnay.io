import React from 'react';
import { render } from 'react-testing-library';
import Container from './Container';

describe('Container', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Container>
        <h1>Hello!</h1>
      </Container>
    );

    const content = getByText('Hello!').textContent;

    expect(content).toEqual('Hello!');
  });
});
