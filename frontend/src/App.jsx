import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', { 'value': inputValue });
      setData('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setData('Error submitting form');
    }
  };

  return (
    <div>
      <h1>My MERN Stack App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputFieldName" // This is the name for the input field
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '20px' }}>Submit</button>
      </form>
      <p>{data}</p>
    </div>
  );
}

export default App;
