const express = require('express');

const { getAllPosts, getUserPost, addUserPost, updateUserPost, deleteUserPost } = require('../controllers/Posts');
const upload = require('../Multer/multerConfig');

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getUserPost);

router.post('/', upload.single('image'), addUserPost);

router.put('/:id', upload.single('image'), updateUserPost);

router.delete('/:id', deleteUserPost);

module.exports = router;