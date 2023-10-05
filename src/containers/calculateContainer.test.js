// src/containers/calculateContainer.test.js

import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CalculateContainer from './calculateContainer';
import {calculate} from '../redux/actions';
import {beforeEach, describe, expect, it} from '@jest/globals';


// Mock the calculate action
jest.mock('../redux/actions');

const mockStore = configureMockStore();
const store = mockStore({});

describe('CalculateContainer', () => {
    beforeEach(() => {
        // Clear the mock calls from previous tests
        calculate.mockClear();
    });

    it('renders Calculate component', () => {
        const {getByText} = render(
            <Provider store={store}>
                <CalculateContainer/>
            </Provider>
        );

        expect(getByText('Calculate')).toBeInTheDocument();
    });

    it('dispatches calculate action with correct arguments when button is clicked', () => {
        // Mock the calculate action to return a specific action type
        calculate.mockReturnValue({type: 'CALCULATE'});

        const {getByText} = render(
            <Provider store={store}>
                <CalculateContainer/>
            </Provider>
        );

        // Simulate a button click
        fireEvent.click(getByText('Calculate'));

        // Expect the calculate action to have been called with specific arguments
        expect(calculate).toHaveBeenCalledWith([], false);

        // Expect the store to have been dispatched with the calculate action
        expect(store.getActions()).toEqual([{type: 'CALCULATE'}]);
    });
});
