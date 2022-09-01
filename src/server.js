require('dotenv').config();
const app = require('./api');
const login = require('./controllers/login');
const user = require('./controllers/user');
const categories = require('./controllers/categories');
const blogPost = require('./controllers/blogPost');
const Validators = require('./database/middlewares/Validators');
const auth = require('./database/middlewares/auth');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', login);
app.post('/user', Validators.validate, user.create);
app.get('/user', auth, user.getAll);
app.get('/user/:id', auth, user.getById);
app.delete('/user/me', auth, user.userDelete);
app.post('/categories', auth, Validators.validateCategory, categories.create);
app.get('/categories', auth, categories.getAll);
app.post('/post',
 auth,
 Validators.validatePostfields,
 Validators.validatePostCategory,
 blogPost.create);
app.get('/post', auth, blogPost.getAll);
app.get('/post/:id', auth, blogPost.getById);
app.put('/post/:id', auth, Validators.validateUpdatedPostfields, blogPost.updatePost);
app.delete('/post/:id', auth, blogPost.deletePost);
app.post('/post/search', auth, blogPost.searchPost);

app.listen(port, () => console.log('ouvindo porta', port));
