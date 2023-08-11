// IMPORTS
// var app = require('../app');
import app from "../app.js";                                       // Configuración del servidor
// var debug = require("debug")("express-cities-api:server");
import logger from "debug"                                      // Módulo de debugeo
const debug = logger("express-cities-api:server");
// var http = require("http");
import http from "http";                                        // Módulo para crear servidores HTTP

// PORT
// process.env guarda las configuraciones de las variables de entorno
// Variables muy delicadas que son necesarias para proteger
// Se configuran con un módulo que se llama DOTENV
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// START SERV
const server = http.createServer(app);                          // Creo un servidor normalizado con HTTP
const ready = () => console.log('server ready on port '+port)   // Aviso del server funcionando
server.listen(port,ready);                                      // Con el metodo listen ESCUCHO el puerto para que empiece a funcionar (a levantarse)
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
