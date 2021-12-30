const { syncAndSeed } = require('./Movie');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'))
);

app.use('/api', require('./api/routes'));

const init = async () => {
  try {
    await syncAndSeed();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (er) {
    console.log(er);
  }
};

init();
