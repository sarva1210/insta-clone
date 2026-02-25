const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const {identifyUser} = require('../middlewares/auth.middleware')

// post /api/posts {protected}
postRouter.post("/",upload.single("image"),identifyUser, postController.createPostController)

// get /api/posts
postRouter.get("/",identifyUser,postController.getPostController)

// get /api/posts/details/:postid
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

// post /api/posts/like/:postid
postRouter.post('/like/:postId',identifyUser,postController.likePostController)

// post /api/posts/unlike/:postid
postRouter.post('/unlike/:postId',identifyUser,postController.unLikePostController)

// get /api/posts/feed
postRouter.get('/feed', identifyUser, postController.getFeedController)

module.exports = postRouter