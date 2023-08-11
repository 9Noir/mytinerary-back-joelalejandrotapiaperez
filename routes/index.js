// let express = require('express');
import express from 'express'
// El enrutador principal va a llamar a TODOS los recursos y los va a mostrar
import userRouter from './users.js'

let router = express.Router();

/* GET home page. */                          // Endpoints
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

// Obligo al enrutador principal a usar las rutas del enrutador del recurso user
router.use('/users',userRouter)
// router.use acepta COMO MINIMO DOS PARAMETROS para poder enrutar correctamente
// 1- La palabra con la que se va a enrutar
// 2- El enrutador que tengo que conectar


// module.exports = router;
export default router
