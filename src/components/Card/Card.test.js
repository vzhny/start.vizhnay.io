import React from 'react';
import { render } from 'react-testing-library';
import Card, { CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <h1>Hello!</h1>
        </CardHeader>
        <CardBody>
          <p>This is the card body.</p>
        </CardBody>
        <CardFooter>
          <p>This is the card footer.</p>
        </CardFooter>
      </Card>
    );

    expect(getByText('Hello!')).toBeInTheDocument();
    expect(getByText('This is the card body.')).toBeInTheDocument();
    expect(getByText('This is the card footer.')).toBeInTheDocument();
  });
});
