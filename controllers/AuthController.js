const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../model/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { name, email, password } = req.body;

  // Validaremos si el email ya exist

  let usuarioExiste = await Usuario.findOne({ email: email });

  if (usuarioExiste) {
    return res.status(400).json({
      ok: false,
      message: "EL usuario ya existe",
    });
  }

  const salt = bcrypt.genSaltSync();
  const newPass = bcrypt.hashSync(password, salt);

  const usuarioModel = new Usuario({
    name,
    email,
    password: newPass,
  });

  await usuarioModel.save();

  // generar JSON web token
  const token = await generarJWT(usuarioModel.id, usuarioModel.name);

  res.status(201).json({ ok: true, message: "reqgister", usuarioModel, token });
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email });
    console.log("ingreso");

    if (!usuario) {
      return res.status(404).send({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    // confirmar password

    const validPass = bcrypt.compareSync(password, usuario.password);

    if (!validPass) {
      return res.status(400).send({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // generar JSON web token
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(200).send({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      ok: false,
      error: error,
    });
  }
};
const revalidarToken = async (req, res = response) => {
  const token = await generarJWT(req.uid, req.name);

  res.json({ ok: true, uid: req.uid, name: req.name, token });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
