const express = require('express');
const dbConnection = require('./database/configuration');
require('dotenv').config()
const PORT = process.env.APP_PORT || 4000
const cors = require('cors')


const app = express();


//DB Connection
dbConnection();


// Directorio publico
app.use( express.static( 'public' ) );
// Middleware Json
app.use( express.json() );

// cors
app.use(cors());

// Rutas
// TODO: auth / crear, login, renew
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
// TODO: crud de eventos



app.listen(PORT, (port) => {
    console.log(`servidor corriendo en ${PORT}`);
});