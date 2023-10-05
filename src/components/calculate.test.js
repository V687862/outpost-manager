import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Calculate from './calculate';
import {expect, test} from "@jest/globals";

test('renders Calculate component', () => {
    // Render the component
    const {getByText} = render(<Calculate onCalculate={() => {
    }}/>);

    // Ensure the button is in the document
    const buttonElement = getByText(/calculate/i);
    expect(buttonElement).toBeInTheDocument();
});

test('calls onCalculate prop when button is clicked', () => {
    // Create a mock function
    const onCalculateMock = jest.fn();

    // Render the component with the mock function as a prop
    const {getByText} = render(<Calculate onCalculate={onCalculateMock}/>);

    // Simulate a button click
    fireEvent.click(getByText(/calculate/i));

    // Ensure the mock function was called
    expect(onCalculateMock).toHaveBeenCalled();
});