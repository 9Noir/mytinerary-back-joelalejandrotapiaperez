// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// IMPORTS
import 'dotenv/config.js'                   // Importo UNICAMENTE la configuración de las variables de entorno
import __dirname from './utils.js'          // Archivo creado. Importo la config de la ubicación del servidor (antes, con common.js, venia pre configurada)
import createError from 'http-errors';      // Crear errores. Debe tener el mismo nombre que se va a usar en el error handler (linea 44)
import express from 'express';              // Provee metodos y propiedades para levantar servidores
import path from 'path';                    // Para conocer la ubicacion de nuestro servidor
// import cookieParser from 'cookie-parser';// Modulos para manejos de cookies
import logger from 'morgan';                // Registro de peticiones al servidor

import indexRouter from './routes/index.js';// Solo se va a configurar las rutas del enrutador de back principal
                                            // Este enrutador va a llamar a TODOS los otros recursos (cities,itineraries,users)
// import usersRouter from './routes/users'; 

const app = express();                      // Ejecutando el módulo express: CREO UNA APP DE BACKEND (SERVIDOR)

// VIEW ENGINE SETUP
// SET es el método necesario para SETear (configurar) algo (motor de plantillas de vistas de EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLERWARES (funciones)
// USE es el método necesario para obligar a mi aplicación a que use la función CADA VEZ que se realiza una SOLICITUD/PETICION
app.use(logger('dev'));                                   // Obligo al servidor a registrar una petición con el módulo de logger/morgan
app.use(express.json());                                  // Obligo al servidor a manipular/leer json
app.use(express.urlencoded({ extended: false }));         // Obliga al servidor a leer params/queries
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // Obligo al servidor a usar los archivos estáticos de la carpeta public

// ROUTER
app.use('/api', indexRouter);                             // Obligo al servidor a que use las rutas del enrutador principal con "/api"
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {                        // Manejo de errores
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app
