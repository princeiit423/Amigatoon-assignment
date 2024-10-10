const express = require('express');
const { check, validationResult } = require('express-validator');
const Webtoon = require('../models/Webtoon');
const { authMiddleware } = require('../middleware/auth');
const login= require("../middleware/login");

const router = express.Router();

// GET all webtoons
router.get('/', async (req, res) => {
    try {
        const webtoons = await Webtoon.find();
        res.json(webtoons);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET webtoon by ID
router.get('/:id', async (req, res) => {
    try {
        const webtoon = await Webtoon.findById(req.params.id);
        if (!webtoon) {
            return res.status(404).json({ message: 'Webtoon not found' });
        }
        res.json(webtoon);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST new webtoon (secured)
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('characters', 'Characters are required').isArray({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, characters } = req.body;
    try {
        const newWebtoon = new Webtoon({ title, description, characters });
        await newWebtoon.save();
        res.json(newWebtoon);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE webtoon by ID (secured)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const webtoon = await Webtoon.findById(req.params.id);
        if (!webtoon) {
            return res.status(404).json({ message: 'Webtoon not found' });
        }
        await webtoon.remove();
        res.json({ message: 'Webtoon removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
