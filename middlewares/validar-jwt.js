const {response, header} = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = header, res = response, next) => {

    const token = req.header('x-token');
    if(!token)
    {
        return  res.status(401).send({
            ok: false,
            msg: 'invalid token'
        })
    }


    // validate the token
    try {

        const key = process.env.SECRET_JWT_KEY;

        const {uid, name} = jwt.verify(token, key )

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return  res.status(401).send({
            ok: false,
            msg: 'invalid token'
        })
    }


    next();
}

module.exports = {
    validarJWT
}