/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const Filter = require('bad-words');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to api',
  });
});

app.get('/filter/:sentence', (req, res) => {
  const sent = req.params.sentence;
  const filter = new Filter();
  res.json({
    message: filter.clean(sent),
  });
});

app.post('/filter/', (req, res) => {
  // console.log(req.body);
  const { data, config } = req.body;
  if (Array.isArray(data) && data.length !== 0) {
    const arr = [];
    if (config !== undefined) {
      const f = new Filter({ ...config });
      data.forEach((str) => {
        arr.push(f.clean(str));
      });
    } else {
      const f = new Filter();
      data.forEach((str) => {
        arr.push(f.clean(str));
      });
    }
    res.json({
      message: arr,
    });
  } else if (typeof data === 'string') {
    if (config !== undefined) {
      const f = new Filter(({ ...config }));
      res.json({
        message: f.clean(data),
      });
    } else {
      const f = new Filter();
      res.json({
        message: f.clean(data),
      });
    }
  } else {
    res.json({
      message: 'Invalid Data',
    });
  }
});

app.listen(3000, () => {
  console.log('Server has started');
});
