import express from "express";
const router = express.Router();
//importar modelo
import User from "../models/user";


//Ruta para crear un nuevo user
router.post('/new-user', async (req, res) => {
  let body = req.body;
  try {
    const userDB = await User.create(body);
    res.status(200).json(userDB);
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Ruta para consultar todos los User
router.get('/user', async (req, res) => {
  try {
    const userDB = await User.find();
    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Se presentó un error al consultar los usuarios ',
      error
    })
  }
});
//Ruta para consultar un User
router.get('/user/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const userDB = await User.findOne({ _id });
    res.json(userDB);
  }
  catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar un User
router.delete('/user/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const userDB = await User.findByIdAndDelete({ _id });
    if (!userDB) {
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(userDB);
  }
  catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar un User
router.put('/user/:id', async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const userDB = await User.findByIdAndUpdate(
      _id, body, { new: true });
    res.json(userDB);
  }
  catch (error) {
    console.log('Datos no actualizados');
    console.log(error);
    return res.status(400).json({
      mensaje: 'Ocurrio un error', error
    })
  }
});


// Exportar configuración
module.exports = router;