const { response } = require("express");
const { validarCampos } = require("../middlewares/ValidarCampos");
const Evento = require("../model/Evento");

const defaultResposne = {
  ok: true,
  msg: "eventoController",
};

const getEventos = async (req, res = response) => {
  const listEventos = await Evento.find().populate("user", "name");
  return res.json(listEventos).status(200);
};

const crearEvento = async (req, res = response) => {
  const newEvent = new Evento(req.body);

  try {
    newEvent.user = req.uid;

    const eventoGuardado = await newEvent.save();

    res.send(eventoGuardado).status(200);
  } catch (error) {
    console.error(error);
    res
      .json({
        error: error.message,
        desciption: "Hable con el administrador",
      })
      .status(500);
  }
};
const obtenerEvento = (req, res = response) => {
  res.json({ ...defaultResposne, msg: "obtenerController" });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const actualizarEvento = async (req, res = response) => {
  const id = req.params.id;

  try {
    const evento = await Evento.findById(id);
    const uid = req.uid;

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: "modelo no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "NO permitido",
      });
    }

    // Vamos a actualizar
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {
      new: true,
    });

    return res.status(200).json({ ok: true, evento: eventoActualizado });
  } catch (error) {
    res.status(500).json({ error: "ha ble con el administrador" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const eliminarEvento = async (req, res = response) => {
  const id = req.params.id;

  try {
    const evento = await Evento.findById(id);
    const uid = req.uid;

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: "modelo no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "NO permitido",
      });
    }


    await Evento.findByIdAndDelete(id);
    return res.status(200).json({ ok: true, msg: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: "ha ble con el administrador" });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  obtenerEvento,
  actualizarEvento,
  eliminarEvento,
};
