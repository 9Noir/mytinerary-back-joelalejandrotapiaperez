import express from 'express'
import generic from './genericRouter.js'
import User from "../models/User.js";
import City from '../models/City.js'
import Itinerary from '../models/Itinerary.js'
import Activity from '../models/Activity.js'
import Like from '../models/Like.js'
import Comment from '../models/Comment.js'
import itinerarySortController from '../controllers/specific/itinerarySortController.js';

let router = express.Router();

// Endpoints
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.use('/users',generic(User))
router.use('/cities',generic(City))
router.use('/itineraries',generic(Itinerary))
router.use('/activities',generic(Activity))
router.use('/likes',generic(Like))
router.use('/comments',generic(Comment))
router.use('/popular',itinerarySortController(Itinerary))

export default router
