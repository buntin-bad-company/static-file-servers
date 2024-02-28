import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); 

app.use((req, res, next) => {
  res.status(404).send('Sorry, page not found!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
