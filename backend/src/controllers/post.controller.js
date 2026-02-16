const postModel = require('../models/post.model')
const Imagekit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res) {
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder:"/cohort-02-insta-clone-posts"
    })
    // res.send(file)

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function getPostController(req,res){

    const userId =  req.user.id 
    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res) {
    
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    // const isValidUser = post.user == userId
    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }
    return res.status(200).json({
        message:"Post fetched successfully",
        posts
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}
