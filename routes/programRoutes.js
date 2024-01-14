// programRoutes.js
const express = require('express');
const programController = require('../controller/programController');
const userAuth = require('../middleware/authMiddleware');
const { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram } = require('../controller/programController');

const router = express.Router();

// Get all programs
router.get('/', userAuth,getAllPrograms);

// Get one program by ID
router.get('/:id', userAuth, getProgramById);

// Create a new program
router.post('/', userAuth, createProgram);

// Update a program by ID
router.put('/:id',userAuth, updateProgram);

// Delete a program by ID
router.delete('/:id', userAuth, deleteProgram);

module.exports = router;
