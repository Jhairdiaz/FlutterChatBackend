const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last50 = await Mensaje.find({
        $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
    })
    .sort({ createdAt: 'desc' })
    .limit(50);

    res.json({
        ok: true,
        mensajes: last50
    })

}

module.exports = { obtenerChat }