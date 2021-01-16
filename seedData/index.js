import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import now_PlayingModel from '../api/now_Playing/nowPlayingModel';
import {getMovies,now_Playing } from '../api/tmdb-api';
import PeoplesModel from '../api/Peoples/PeoplesModel';
import {Peoples} from './Peoples.js';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
    console.log('load user Data');
      try {
        await userModel.deleteMany();
        await users.forEach(user => userModel.create(user));
        console.info(`${users.length} users were successfully stored.`);
      } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
      }
    }
    export async function loadMovies() {
        console.log('load movies');
        try {
          getMovies().then(async mov =>{
          await movieModel.deleteMany();
          await movieModel.collection.insertMany(mov);
          console.info(`${mov.length} Movies were successfully stored.`);
        });
        } catch (err) {
          console.error(`failed to Load movie Data: ${err}`);
        }
      }
      
      export async function loadnow_Playing() {
        console.log('load now playing');
        try {
          now_Playing().then(async movies =>{
          await now_PlayingModel.deleteMany();
          await now_PlayingModel.collection.insertMany(movies);
          console.info(`${movies.length} Movies were successfully stored.`);
        });
        } catch (err) {
          console.error(`failed to Load movie Data: ${err}`);
        }
      }
      export async function loadPeoples() {
        console.log('load seed Peoples data');
        console.log(Peoples.length);
        try {
          await PeoplesModel.deleteMany();
          await PeoplesModel.collection.insertMany(Peoples);
          console.info(`${Peoples.length} Peoples were successfully stored.`);
        } catch (err) {
          console.error(`failed to Load Peoples Data: ${err}`);
        }
      }
 