const joi = require("joi");
const userJoiSchema = joi.object({
    user:joi.object({
        name: joi.string().min(3).required(),
        email:joi.string().email().required(),
        password: joi.string().min(6).required()
    }).required()
})
const userJoiSchemaforLogin = joi.object({
    user:joi.object({
        email:joi.string().email().required(),
        password: joi.string().min(6).required()
    }).required()
})

const newNoteJoiSchema = joi.object({
    note:joi.object({
        title:joi.string().required(),
        description:joi.string().required()
    }).required()
})
const editNoteJoiSchema = joi.object({
    note:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
    }).required()
})

module.exports = {userJoiSchema, userJoiSchemaforLogin, newNoteJoiSchema, editNoteJoiSchema};