import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  nivel: String,
  pregunta: String,
  categoria: String,
  respuestas:[
    { texto: String, correcta: Boolean},
  ],
  imagen: String
});


// Convertir a modelo
const Question = mongoose.model('Question', questionSchema);
export default Question;