const mongoose = require('mongoose');
const { Schema } = mongoose;

const InformacionSchema = new Schema({
    regulacion_id: { type: Number, required: true },
    regulacion: { type: String, required: true },
    url: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
    institucion_emisora: { type: String, required: true },
    registro_oficial_numero: { type: String, required: true },
    registro_oficial_fecha: { type: String, required: true },
    suscripcion: { type: String, required: true },
    archivo: { type: String, required: true },
    modificado: { type: String, required: true }
})

module.exports = mongoose.model('Informacion', InformacionSchema);