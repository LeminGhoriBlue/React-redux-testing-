import React from 'react';
import { render, fireEvent, waitFor, screen, getByRole } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toHaveBeenCalledWith } from "@testing-library/jest-dom"
import AddData from './AddData';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AddData', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            data: [],
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddData />
                </MemoryRouter>
            </Provider>
        );
    });

    it('should render with the correct initial state', () => {
        const state = store.getState();
        expect(screen.getByText('Enter State')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter title')).toHaveValue('');
        expect(screen.getByPlaceholderText('Enter body')).toHaveValue('');
        expect(state.data.length).toBe(0);
    });

    test('should add data when the form is submitted', async () => {
        const titleInput = screen.getByPlaceholderText('Enter title');
        const bodyInput = screen.getByPlaceholderText('Enter body');
        const selectBox = screen.getByRole('combobox');
        userEvent.selectOptions(selectBox, ["1"]);
        fireEvent.change(titleInput, { target: { value: 'Test title' } });
        fireEvent.change(bodyInput, { target: { value: 'Test body' } });

        const addButton = screen.getByText('Add Data');
        fireEvent.click(addButton);


    });
    it('should display validation errors for required fields', async () => {
        const validationMessage = 'Required title';
        const titleInput = screen.getByPlaceholderText('Enter title');
        const useridInput = screen.getByPlaceholderText('Enter State')
        const submitButton = screen.getByText('Add Data');
        const selectBox = screen.getByRole('combobox');

        userEvent.selectOptions(selectBox, ['']);
        fireEvent.change(titleInput, { target: { value: '' } });
        fireEvent.click(useridInput, { target: { value: '' } })
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(validationMessage)).toBeInTheDocument();
        });
    });
});
