const axios = require('axios');

describe('Backend API Test', () => {
  test('API Request', async () => {
    const response = await axios.get('http://localhost:5000/values'); // Assuming your backend runs on port 5000 and the API endpoint is /values
    const responseData = response.data;

    console.log(responseData); // Log the response data

    // Optional: Add assertions to check if the data retrieved matches expected values
  });
});