import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from './Home';
import { callApi, apiRes } from '../../Reduxs/Action';
import { MemoryRouter } from 'react-router-dom';
import { toHaveBeenCalledWith } from "@testing-library/jest-dom"
import axios from "axios";
import nock from 'nock';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe('Home component', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                data: [
                    {
                        id: 1,
                        userId: 0,
                        title: 'Title 1',
                    },
                    {
                        id: 2,
                        userId: 1,
                        title: 'Title 2',
                    },
                    {
                        id: 3,
                        userId: 2,
                        title: 'Title 3',
                    }
                ],
            },
        });
        store.dispatch = jest.fn();
    });

    it('renders a table with correct data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
        const tableRows = screen.getAllByRole('row');
        expect(tableRows.length).toBe(4);
        const cells = screen.getAllByRole('cell');
        expect(cells[1]).toHaveTextContent('Title 1');
        expect(cells[4]).toHaveTextContent('susses');
        expect(cells[5]).toHaveTextContent('Title 2');
    });

    it('opens the edit dialog when edit button is clicked', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>,
        );

        fireEvent.click(screen.getAllByTestId('btn-edit')[0]);
        await waitFor(() => expect(screen.getByText('Edit Data')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('editYes'));

        const titleInput = screen.getByTestId('TITLE');
        fireEvent.change(titleInput, { target: { value: 'Test title' } });
    });

    it('dispatches the callApi action on mount', async () => {
        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;
        await store.dispatch(callApi());
    });

    it('opens the Delete dialog when Delete button is clicked', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>,
        );
        fireEvent.click(screen.getAllByTestId('btn-delete')[0]);
        await waitFor(() => expect(screen.getByText('Are You Sure You Want To Delete This Data')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('DaleteYes'));
    });
});

describe('callApi', () => {
    it('should call api and dispatch apiRes action', async () => {
        const dispatch = jest.fn();
        const resData = [{ id: 1, title: 'Test' }];

        axios.get = jest.fn().mockResolvedValueOnce({ data: resData });

        await callApi()(dispatch);

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?_limit=10');
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(apiRes(resData));
    });

    it('should call api and dispatch error action', async () => {
        const dispatch = jest.fn();
        const errorMessage = 'Api Call Not';
        axios.get = jest.fn().mockRejectedValueOnce({ message: errorMessage });

        await callApi()(dispatch);

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?_limit=10');
        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});