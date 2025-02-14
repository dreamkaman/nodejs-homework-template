//Имя файла модели - всегда название в единственном числе
const {Schema, model} = require("mongoose");

const Joi=require("Joi");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  });

  const Contact = model("contact", contactSchema);//название - существительное в единственном числе с большой буквы

  const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
  });
  
  const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.bool(),
  })
    .min(1)
    .max(4);

  const contactUpdateFavoriteSchema=Joi.object({
    favorite:Joi.bool().required(),
  });

  module.exports = {
    Contact,
    schemas:{
      contactsAddSchema,
      contactUpdateSchema,
      contactUpdateFavoriteSchema,
    }
   
  };
