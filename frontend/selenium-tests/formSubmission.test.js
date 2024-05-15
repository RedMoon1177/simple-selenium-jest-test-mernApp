const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

describe('Submit Form with Random Texts', () => {
  let driver;
  let randomTexts = []; // Array to store random texts

  beforeAll(async () => {
    const options = new chrome.Options();
    // Additional options can be set here if needed
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Submit Form with Random Texts and Text Matching Test', async () => {
    await driver.get('http://localhost:3000'); // Assuming your frontend runs on port 3000

    // Array to store promises for axios requests
    const axiosPromises = [];

    // Loop to submit the form multiple times with random text
    for (let i = 0; i < 10; i++) {
      const randomText = faker.internet.userName();
      randomTexts.push(randomText); // Save random text to the array

      const inputField = await driver.findElement(By.name('inputFieldName'));
      await inputField.sendKeys(randomText, Key.RETURN);

      // Clear the input field after Enter key is pressed
      await inputField.clear();

      // Push the axios promise to the array
      axiosPromises.push(axios.get('http://localhost:5000/values'));
    }

    // Wait for all axios requests to finish
    const responses = await Promise.all(axiosPromises);

    // Loop through the responses to check stored texts and perform assertions
    responses.forEach((response, index) => {
      const storedText = response.data[index].value;
      console.log(`Random Text:${index}`, randomTexts[index]);
      console.log(`Stored Text:${index}`, storedText);
      expect(storedText).toBe(randomTexts[index]); // Assertion with stored random text
    });
  });
});
