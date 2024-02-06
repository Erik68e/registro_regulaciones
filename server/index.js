const express = require('express');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');
const cors = require('cors');

//settings
app.set('port', process.env.PORT  || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))

//routes
app.use('/api/informacion', require('./routes/informacion.routes'));
app.use('/api/user', require('./routes/user.routes'));

//starting the server
app.listen(app.get('port'), () => {
  console.log('Server corriendo en el puerto 3000');
});
