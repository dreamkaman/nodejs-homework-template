//Имя файла модели - всегда название в единственном числе
const {Schema, model} = require("mongoose");

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  });

  const Contact = model("contact", contactSchema);//название - существительное в единственном числе с большой буквы

  module.exports = Contact;
