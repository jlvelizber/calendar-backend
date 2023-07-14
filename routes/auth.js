const { Router } = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/AuthController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/ValidarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();


/**
 * Login
 */
router.post(
  "/",
  [
    check("email", "Correo obligatorio").isEmail(),
    check("password", "Password debe de ser 6 caracteres").isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario
);

/**
 * crear Usuario
 */
router.post(
  "/new",
  // Middlewares de rutas
  [
    check("name", "Nombre obligatorio").not().isEmpty(),
    check("email", "Correo obligatorio").isEmail(),
    check("password", "Password debe de ser 6 caracteres").isLength({ min: 6 }),
    validarCampos
  ],
  crearUsuario
);



/**
 * Renew token
 */
router.post("/renew", [ validarJWT ] ,revalidarToken);

module.exports = router;
