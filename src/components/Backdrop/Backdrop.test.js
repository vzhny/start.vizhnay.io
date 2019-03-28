import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Backdrop from './Backdrop';

describe('Backdrop', () => {
  it('should render without crashing', () => {
    const mockFn = jest.fn();

    const { getByRole } = render(<Backdrop toggleVisibility={mockFn} />);
    fireEvent.click(getByRole('backdrop'));
    expect(mockFn).toHaveBeenCalled();
  });
});
