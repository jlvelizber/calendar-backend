/**
 * EVENTS ROUTES
 *
 * api/events
 */
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  obtenerEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/EventController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/ValidarCampos");
const { isDate } = require("../helpers/isDate");
const router = new Router();

// TODO: Aqui estamos diciendole a todo el controller que se van a validar las rutas desde esta linea hasta abajo
router.use(validarJWT);

// obtener eventos
router.get("/", getEventos);
// crear eventos
router.post(
  "/",
  [
    check("title", "el titulo es requerido").not().isEmpty(),
    check("start", "fecha de inicio obligatorio").custom(isDate),
    check("end", "fecha de finalizacion obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
// actualizar eventos
router.get("/:id", [check], obtenerEvento);
// actualizar eventos
router.put("/:id", actualizarEvento);
// eliminar eventos
router.delete("/:id", eliminarEvento);

module.exports = router;
