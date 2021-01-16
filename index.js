import dotenv, { load } from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import now_PlayingRouter from './api/now_Playing';
import bodyParser from 'body-parser';
import './db';
import {loadUsers, loadMovies,loadnow_Playing,loadPeoples} from './seedData';
import usersRouter from './api/users';
import passport from './authenticate';
import session from 'express-session';
import PeoplesRouter from './api/Peoples';


dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadnow_Playing();
  loadPeoples();
}
const app = express();

const port = process.env.PORT;

app.use(passport.initialize());

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/now_Playing', now_PlayingRouter);
app.use(errHandler);
app.use('/api/Peoples', PeoplesRouter);

const server = app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

module.exports = server;