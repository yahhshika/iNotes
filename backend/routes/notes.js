const express=require("express");
const router = express.Router();
const Note = require("../models/Notes");
const asyncWrap = require("../Utils/asyncWrap");
const ExpressError = require("../Utils/ExpressError");
const {validateEditNotesSchema, validateNewNotesSchema,authenticate, isNoteOwner} = require("../middlewares");
const notesController = require("../controllers/notes")


//get all notes
router.get("/",authenticate,asyncWrap(notesController.getAllNotes))

//new note
router.post("/",authenticate, validateNewNotesSchema,asyncWrap(notesController.addNewNote))

//edit note
router.put("/:id",authenticate,isNoteOwner, validateEditNotesSchema,asyncWrap(notesController.editNote));

//delete note
router.delete("/:id",authenticate,isNoteOwner, asyncWrap(notesController.deleteNote))

module.exports = router;