import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testDataA = {
    id: 1,
    headline: "asdasdasd",
    createdOn: 1,
    author: 'aasdtg',
    image: 134,
    summary: "aasd",
    body: "asdasd"
}

const testDataB = {
    id: 1,
    headline: "asdasdasd",
    createdOn: 1,
    author: null,
    image: 134,
    summary: "aasd",
    body: "asdasd"
}
test('renders component without errors', ()=> {
    render(<Article article ={testDataA} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article ={testDataA} />);
    const headline = screen.queryByText(/asdasdasd/i);
    const author = screen.queryByText(/aasdtg/i)

    expect(headline).toBeInTheDocument()
    expect(headline).toBeTruthy()
    expect(headline).toHaveTextContent("asdasdasd")
    expect(author).toBeInTheDocument()
    expect(author).toBeTruthy()
    expect(author).toHaveTextContent("aasdtg")
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article ={testDataB} />);

    const author = screen.queryByText(/Associated Press/i);

    expect(author).toBeInTheDocument()
    expect(author).toBeTruthy()
    expect(author).toHaveTextContent("Associated Press")
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    const mock = jest.fn()
    
    render(<Article article ={testDataA} handleDelete = {mock}  />);

    const button = await screen.findByTestId('deleteButton')

    userEvent.click(button)

    await waitFor(() => expect(mock).toBeCalled())

});

//Task List:
//1. Complete all above tests. Create test article data when needed.