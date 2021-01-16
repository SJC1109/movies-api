import express from 'express';
import now_PlayingModel from './nowPlayingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    now_PlayingModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });


export default router;
