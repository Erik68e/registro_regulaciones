const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    usuario: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['operador', 'administrador'], default: 'administrador' } // Agregar el campo de role con el valor predeterminado 'administrador'
 });

module.exports = mongoose.model('User', userSchema);
