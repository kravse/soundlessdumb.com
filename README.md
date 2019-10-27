This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run: `npm start`, `npm test` or `npm run build`

Back Story:

This is a nonsensical experiment I used to explore React, Python and the Merriam-Webster API. Initially this project relied on the Merriam-Webster API, but since the API limits requests to 1000 lookups per day, I migrated it to use chunked thesaurus files. I used python to create the chunks by modifying a very large JSON thesaurus I found online. The file I started with was (16MB). I removed all words where `word.length < 9 && word.length > 3`. Then I cycled through the synonyms and discarded all but the longest synonym for each word. Finally I chunked the files into unique js files `a.js, b.js ..` ..etc. WebPack chunks these files and loads them as necessary, so that users only pull up the data they need.

The results are still ridiculous, but hey... it's more about the process than the result right? ...right?

![Screenshot](/src/images/screenshot.jpg)
