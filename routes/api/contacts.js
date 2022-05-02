const express = require("express");

const createError = require("http-errors");

const router = express.Router();

const { Contact, schemas } = require("../../models/contact");

const { authenticate } = require("../../middlewares");

const { contactsAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema } = schemas;

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    
    const { page = 1, limit = 20 } = req.params;

    const skip = (page - 1) * limit

    limit = Number(limit); //skip,limit must be numbers

    const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email");

    res.json(result);

  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { _id } = req.user;

    // const result = await Contact.findById(contactId).populate("owner", "email");

    const result = await Contact.findById(contactId).populate("owner", "email");

    if (!result || String(_id) !== String(result.owner._id)) {
      throw createError(404, "Not found");
    }

    res.json(result);

  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw createError(400, "missing required name field");
    }

    const data = { ...req.body, owner: req.user._id };

    const result = await Contact.create(data);

    res.status(201).json(result);
  } catch (error) {

    if (error.message.includes = "validation failed") {
      error.status = 400;
    }
    next(error);
  }
});

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // const {_id} = req.user;

    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw createError(404, "Not found");
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const body = req.body;

    const { error } = contactUpdateSchema.validate(body);

    console.log(error);

    if (error) {
      throw createError(400, "missing fields");
    }

    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const body = req.body;

    const { error } = contactUpdateFavoriteSchema.validate(body);

    console.log(error);

    if (error) {
      throw createError(400, "missing fields");
    }

    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
