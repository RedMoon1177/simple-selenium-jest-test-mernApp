// JEST TEST TEXT MATCHING WITHOUT USING SELENIUM ///////////////////////////////
// describe('Text Matching Test', () => {
//   test('Input Text Matches Stored Text', async () => {
//     // Generate a random input text using Faker
//     const inputText = faker.internet.userName();
//     console.log('Input Data:', inputText);

//     // Send input text to backend to store in the database
//     await axios.post('http://localhost:5000/submit', { value: inputText });

//     // Retrieve text from the database or backend endpoint
//     const response = await axios.get('http://localhost:5000/values');
//     const storedText = response.data[0].value;

//     // Log the response data
//     console.log('Response Data:', storedText);

//     // Compare input text with stored text
//     expect(storedText).toBe(inputText);
//   });
// });
///////////////////////////////////////////////////////////////////////////////////