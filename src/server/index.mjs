import express from 'express';
import { getAllTargets } from '../db/queries/index.mjs';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

app.get('/', (req, res) => {
  res.send('API');
});

app.get('/targets', async (req, res) => {
  const targets = await getAllTargets();
  res.json(targets);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
