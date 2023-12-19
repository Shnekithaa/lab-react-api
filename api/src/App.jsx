import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", { headers: { 'Authorization': 'whatever-you-want' }})
      .then(response => {
        setBookData(response.data.books);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Error: Data not found. Please check the URL.');
        } else {
          setError('Error: Unable to fetch data. Please try again later.');
        }
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Book Information</h1>
      {error ? (
        <p>{error}</p>
      ) : bookData.length ? (
        <div>
          {bookData.map(book => (
            <div key={book.id} className='book'>
              <h2>Title: {book.title}</h2>
              <img src={book.imageLinks.thumbnail} alt="Book Cover" />
              <div className='sub-book'>
              <p>Description: {book.description}</p>
              <p>Authors: {book.authors.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
