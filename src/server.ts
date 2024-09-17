import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 4000;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your TypeScript API!');
});

app.get('/api/version', (req: Request, res: Response) => {
  res.json({ version: '1.0' });
});

app.post('/api/echo', (req: Request, res: Response) => {
  const { body } = req;
  res.json({ echo: body });
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/api/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});