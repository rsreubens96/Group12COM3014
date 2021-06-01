const express = require("express"); // import node express
const { randomBytes } = require("crypto"); // import crypto

const app = express(); //instantiate node express
const cors = require("cors")
app.use(cors())
app.use(express.json()); // instantiate bodyparser from node express
const Comment = require('./db.js');
const { allowedNodeEnvironmentFlags } = require("process");


//GET request handler - find associated comments for a given post id
app.get("/posts/:id/comments", async (req, res) => {
  console.log(req.params.id)
  try{
    const Comments  = await Comment.find()
    res.json(Comments)

  }
  catch (err){
    response.json({message:err})
  }

  // res.send(commentsByPostId[req.params.id] || []);
  //if post has comments - retrieves array of comments
  // if post has no comments - undefined -> thus returns empty array */
});

//POST request handler
app.post("/posts/:id/comments", async (req, res) => {
  // const commentId = randomBytes(4).toString("hex"); // generate random id - hexadecimal string
  const content  = req.body; // content provided by user
  console.log(content)
  try {
    const now = new Date()
    const postId = content.post_id
    const newComment = new Comment({
      post_id: postId,
      comment: content.comment,
      createdAt: now
    })
    const savedComment = await newComment.save()
    res.json(savedComment)

  }
  catch(err){
    res.json({message: err})
  }


  // const comments = commentsByPostId[req.params.id] || [];
  // comments.push({ id: commentId, content }); // push commentId as well as user-provided content

  // commentsByPostId[req.params.id] = comments; // update comments
  // // assign comments array back to commentsbypostid object
  // res.status(201).send(comments); // send back entire array of comments
  // //could send back comment created specifically
});
// specifying port for listening
app.listen(4003, () => {
  console.log("Listening on 4003");
});
