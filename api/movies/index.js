import express from 'express';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next)=> {
  movieModel.find().then(movies => res.status(200).send(movies))
  .catch(next);
});

router.get('/:id', async (req, res, next)=>{
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if(movie){
  movieModel.findByMovieDBId(id).then(movie =>res.status(200).send(movie))
  .catch(next);
  }else{
    res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
  }
});

export default router;