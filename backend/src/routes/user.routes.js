const express = require('express')
const userController = require('../controllers/user.controller')
const {identifyUser} = require('../middlewares/auth.middleware')
const userRouter = express.Router()

console.log("identifyUser:", identifyUser)
console.log("follow:", userController.followUserController)
console.log("unfollow:", userController.unfollowUserController)

// @route Post /api/users/follow/:userid
// @description Follow a user
// @access Private 
userRouter.post(
  '/follow/:username',
  identifyUser,
  userController.followUserController
)

userRouter.post(
  '/unfollow/:username',
  identifyUser,
  userController.unfollowUserController
)

userRouter.post(
  '/accept/:username',
  identifyUser,
  userController.acceptFollowRequestController
)

userRouter.post(
  '/reject/:username',
  identifyUser,
  userController.rejectFollowRequestController
)


module.exports = userRouter
