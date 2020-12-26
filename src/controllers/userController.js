const {db} = require('../../db')
const bcrypt = require("bcryptjs");
const generateToken = require('../../utilities/generateToken')
const nodemailer = require('nodemailer')

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
            if(result) return generateToken(res, user[0].email, user[0].id, user[0].admin)
        })

    })

}


exports.CreateAdmin = (req, res) => {
    
    const { email, password, passwordConfirm } = req.body
    db.query('SELECT * FROM user WHERE email =?', [email], (err, result) => {
        if(err) return res.status(500).json({message: 'Hubo un error'})
        if(result.length > 0) return res.status(400).json({ message: 'Email existente' })
        if( password != passwordConfirm ) return res.status(400).json({ message: 'Las contraseñas no coinciden' }) 

        let HashedPass = bcrypt.hash(password, 8)
        .then((pass) => {
            db.query('INSERT INTO user SET?', {email, password_hash: pass, admin: 1 }, (error, resultado) => {
                if(error) return res.status(500).json({ message: 'Hubo un error' })
                if(resultado) return res.status(200).json({ message: 'Usuario creado exitosamente' })
            })
        })
        .catch((error) => {
            if(error) return res.status(500).json({ message: 'Hubo un error' })
        })
   
    })

}

exports.ForgotPass = (req, res) => {

    const { email } = req.body

    db.query(`SELECT * FROM user WHERE email =? `,[email], (err, result) => {

        if(err || result.length == 0) return res.status(400).json({message: 'Ingrese el mail de un usuario valido'})
        if(result) {
           
            let trasporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "testjuancastro@gmail.com",
                    pass: 'test1234*'
                }
               
            })
        


            let mailOptions = {
                from: 'testjuancastro@gmail.com',
                to: `${req.body.email}`,
                subject: "Reset Password",
                html: `<h4> Para cambiar la contraseña haga <a href='http://localhost:3000/reset/${result[0].id}' >click aqui</a> </h4>`
            }
        
            trasporter.sendMail( mailOptions, (error, resultado) =>{
                console.log(error)
                if(error) return res.status(400).json({message: error})
                if(resultado) return res.status(200).json({message: 'Mail enviado'})
            })

        }
    })

   
}


exports.resetPass = (req, res) => {

    const { id } = req.params
    const { password, passwordConfirm } = req.body

    db.query('SELECT * FROM user WHERE id = ?', [id], (err, resultado) => {
        if (err) return res.status(400).json({message: 'No se encontro el usuario'})
        if (password != passwordConfirm) return res.status(400).json({message: 'Las contraseñas no coinciden'})
        if (resultado) {
            let hashedPassword = bcrypt.hash(password, 8)
            .then((NewPass) => {
                db.query(`UPDATE user SET? WHERE id = ${ id } `, {password_hash: NewPass}, (error, result) => {
                    console.log(error)
                     if (error) return res.status(400).json({message: 'La contraseña no es valida'})
                     if (result) {
                         return res.status(200).json({message: 'Contraseña cambiada exitosamente'})
                     } 
                 });
            })
            .catch((err) => {
                console.log(err)
            })
            
           
        }
    });

}