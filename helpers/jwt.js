const jwt = require("jsonwebtoken");
const generarJWT = (uid, name) => {
  const signJWT = process.env.SECRET_JWT_KEY;
  return new Promise((resolve, reject) => {
    const paylad = { uid, name };

    jwt.sign(
      paylad,
      signJWT,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(`No se pudo generar el token`);
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generarJWT };
