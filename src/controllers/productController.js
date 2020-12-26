const { db } = require('../../db')
const fetch = require('node-fetch');


exports.createProduct = (req, res) => {

    let valorMoneda;

    const { nombre, descripcion, valor, tipo_moneda, categoria, imagen } = req.body

    fetch('https://api.exchangeratesapi.io/latest')
    .then(res => res.json())
    .then(json =>  {

       let valorEuro = json.rates.USD
       
       if( tipo_moneda == 'USD' )  valorMoneda = valor
       if( tipo_moneda == 'EUR' )  valorMoneda = Math.round((valor / valorEuro + Number.EPSILON) * 100) / 100 

       db.query('INSERT INTO productos SET?', { nombre, descripcion, valor: valorMoneda, tipo_moneda, categoria, imagen }, (err, result) => {
           if(err) return res.status(400).json({ message: 'Hubo un error al crear el producto' })
           if(result) return res.status(200).json({ message: 'Producto creado exitosamente' })
       })
        
    });
   

}


exports.getProducts = (req, res) => {

    db.query('SELECT * FROM productos', (err, result) => {
        if(err) return res.status(400).json({ message: 'Hubo un error al traer los productos' })
        if(result) return res.status(200).json(result) 
    })

}

exports.getProduct = (req, res) => {

    const { id } = req.params

    db.query(`SELECT * FROM productos WHERE id = ${id}`, (err, result) => {

        if(err) return res.status(400).json({ message: 'Hubo un error al traer los productos' })
        if(result) return res.status(200).json(result) 

    })

}


exports.updateProduct = (req, res) => {

    const { id } = req.params

    let valorMoneda;

    const { nombre, descripcion, valor, tipo_moneda, categoria, imagen } = req.body

    fetch('https://api.exchangeratesapi.io/latest')
    .then(res => res.json())
    .then(json =>  {

       let valorEuro = json.rates.USD
       
       if( tipo_moneda == 'USD' )  valorMoneda = valor
       if( tipo_moneda == 'EUR' )  valorMoneda = Math.round((valor / valorEuro + Number.EPSILON) * 100) / 100 

       db.query(`UPDATE productos SET? WHERE id = ${ id }`, { nombre, descripcion, valor: valorMoneda, tipo_moneda, categoria, imagen }, (err, result) => {
           if(err) return res.status(400).json({ message: 'Hubo un error al modificar el producto' })
           if(result) return res.status(200).json({ message: 'Producto modificado exitosamente' })
       })
        
    });

}


exports.deleteProduct = (req, res) => {

    const { id } = req.params

    db.query(`DELETE FROM productos WHERE id = ${ id }`, (err, result) => {

        if(err) return res.status(400).json({ message: 'Hubo un error al eliminar el producto' })
        if(result) return res.status(200).json({ message: 'Producto eliminado exitosamente' })
    })

}