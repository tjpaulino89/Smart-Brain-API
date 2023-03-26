const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://mydb_aan0_user:JGkKzSoTyAkcB67BdK35Kjf2peaDC2oF@dpg-cgf5fbseoogqfc3ms9s0-a.ohio-postgres.render.com/mydb_aan0',
    ssl: { rejectUnauthorized: false },
    host : process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success')
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running port ${process.env.PORT}"`);
})