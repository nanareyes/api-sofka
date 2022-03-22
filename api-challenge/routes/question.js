import express from "express";
const router = express.Router();
//importar modelo
import Question from "../models/question";


// Ruta para consultar una question
router.get('/question/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const question = await Question.findById({ _id });
    res.json(question);
  }

  catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Ruta para consultar las preguntas por niveles
router.get('/question', async (req, res) => {
  const nivel = req.query.level;
  console.log('nivel', req.query)
  try {
    const questions = await Question.find({nivel: nivel});
    const question = questions[Math.floor(Math.random()*questions.length)]
    res.json(question);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Se presentó un error al consultar las preguntas de la base de datos',
      error
    })
  }
});

//Ruta para enviar una respuesta
router.post('/answer/:id', async (req, res) => {
  let answer = req.body.answer
  const _id = req.params.id;

  try {
    const question = await Question.findById({ _id });
    let answers = question.respuestas
    console.log('answer', answers)
    res.json(question);
  }

  catch (error) {
    console.log(error)
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Exportar configuración
module.exports = router;