const Informacion = require("../models/informacion");

const informacionController = {};

informacionController.getInformacion = async (req, res) => {
    const informacion = await Informacion.find();
    res.json(informacion);
}

informacionController.createInformacion = async (req, res) => {
    const nuevaInformacion = new Informacion(req.body);
    console.log(nuevaInformacion);
    await nuevaInformacion.save();
    res.json({ status: 'Informacion guardado' });
}

informacionController.getInformacionById = async (req, res) => {
    console.log(req.params.id);
    const informacion = await Informacion.findById(req.params.id);
    res.json(informacion);
}

informacionController.editInformacion = async (req, res) => {
    const { id } = req.params;
    const informacion = {
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    await Informacion.findByIdAndUpdate(id, { $set: informacion }, { new: true });
    res.json({ status: 'Informacion actualizado' });
}

informacionController.deleteInformacion = async (req, res) => {
    const { id } = req.params;

    try {
        await Informacion.findByIdAndDelete(id);
        res.json({ status: 'Informacion eliminado' });
    } catch (error) {
        console.error('Error deleting informacion', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = informacionController;
