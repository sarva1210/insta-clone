const express = require('express')
const postController = require('../controllers/post.controller')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const identifyuser = require('../middlewares/auth.middleware')
// post /api/posts {protected}
postRouter.post("/",upload.single("image"),identifyuser, postController.createPostController)

// get /api/posts
postRouter.get("/",identifyuser,postController.getPostController)

// get /api/posts/details/:postid
postRouter.get("/details:postId",identifyuser, postController.getPostDetailsController)


module.exports = postRouter