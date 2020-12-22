const {db} = require('../../db')
const bcrypt = require("bcryptjs");
const generateToken = require('../../utilities/generateToken')

exports.CreateUser = (req, res) => {
    
    const { email, password, passwordConfirm } = req.body
    db.query('SELECT * FROM user WHERE email =?', [email], (err, result) => {
        if(err) return res.status(500).json({message: 'Hubo un error'})
        if(result.length > 0) return res.status(400).json({ message: 'Email existente' })
        if( password != passwordConfirm ) return res.status(400).json({ message: 'Las contraseñas no coinciden' }) 

        let HashedPass = bcrypt.hash(password, 8)
        .then((pass) => {
            db.query('INSERT INTO user SET?', {email, password_hash: pass }, (error, resultado) => {
                if(error) return res.status(500).json({ message: 'Hubo un error' })
                if(resultado) return res.status(200).json({ message: 'Usuario creado exitosamente' })
            })
        })
        .catch((error) => {
            if(error) return res.status(500).json({ message: 'Hubo un error' })
        })
   
    })

}

exports.loginUser = (req, res) => {
    
    const { email, password } = req.body
    
    db.query('SELECT * FROM user WHERE email =?', [email], (err, user) => {

        if (err || user.length == 0) return res.status(500).json({ message: "Error al obtener el usuario" });

        bcrypt.compare(password, user[0].password_hash, (err, result) => {

            if(err) return res.status(400).json({ message: "Las contraseñas no coinciden" })
            if(result) return generateToken(res, user[0].email)
        })

    })

}