#!/usr/bin/node
/**
 * Prints all characters of a Star Wars movie.
 */
const process = require('process');
const request = require('request');

if (process.argv.length !== 3) {
  throw new Error('Usage: ./0-starwars_characters.js <movie id>');
}
const movieId = process.argv[2];

function characterData (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error(`HTTP Error! Status: ${response.statusCode}`));
      } else {
        body = JSON.parse(body);
        console.log(body.name);
        resolve();
      }
    });
  });
}

async function getCharacters (url) {
  request(url, async (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    if (response.statusCode !== 200) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    body = JSON.parse(body);
    const characters = body.characters;
    for (const url of characters) {
      try {
        await characterData(url);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

getCharacters(`https://swapi-api.alx-tools.com/api/films/${movieId}/`);
