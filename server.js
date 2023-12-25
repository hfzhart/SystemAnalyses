const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.use((req, res, next) => {
  if (req.method !== 'GET' && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
  
});


server.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { isLoggedIn, email, password } = req.body;
  const user = db.get('users').find({ id: userId });

  if (user.value()) {
    user.assign({ isLoggedIn, email, password }).write();
    const updatedUser = user.value(); // Получаем обновленные данные пользователя
    res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});


server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
