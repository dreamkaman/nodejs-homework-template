const express = require("express");
const Joi = require("joi");
const createError = require("http-errors");

const router = express.Router();

 const Contact = require("../../models/contact");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .min(1)
  .max(3);

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const result = await contactsActions.getContactById(contactId);

//     if (!result) {
//       throw createError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw createError(400, "missing required name field");
    }

    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const result = await contactsActions.removeContact(contactId);

//     if (!result) {
//       throw createError(404, "Not found");
//     }

//     res.json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const body = req.body;

//     console.log(body);

//     const { error } = contactUpdateSchema.validate(body);

//     console.log(error);

//     if (error) {
//       throw createError(400, "missing fields");
//     }

//     const result = await contactsActions.updateContact(contactId, body);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
