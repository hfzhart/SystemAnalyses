const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Добавляем middleware для проверки аутентификации перед выполнением запросов
server.use((req, res, next) => {
  if (req.method !== 'GET' && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = db.get('users').find({ email, password }).value();

  if (user) {
    user.isLoggedIn = true;
    return res.json({ message: 'Login successful', user });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.post('/logout', (req, res) => {
  const { userId } = req.body;

  const user = db.get('users').find({ id: userId }).value();

  if (user) {
    user.isLoggedIn = false;
    return res.json({ message: 'Logout successful' });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
