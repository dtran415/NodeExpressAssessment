const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    const developers = req.body.developers;
    if (!developers) {
      return res.status(400).send("Please supply a list of developers");
    }

    const calls = developers.map(d => axios.get(`https://api.github.com/users/${d}`));

    const results = [];
    for (let call of calls) {
      try {
        const r = await call;
        results.push({ name: r.data.name, bio: r.data.bio });
      } catch(err) {

      }
    }

    return res.json(results);
  } catch (err) {
    next(err);
  }
});

app.listen(3000);
