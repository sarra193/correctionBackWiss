const Post = require("../models/Post");
const User=require("../models/User");
const ObjectID=require("mongoose").Types.ObjectId;
require("dotenv").config({path :"./config/.env"})


exports.register=async(req,res)=>{
    const {country,dateStart,dateEnd,description}=req.body;
    try{
   

    const newPost= new Post(
      {
            country,
            dateStart,
            dateEnd,
            description,
            
        }
    )
    await newPost.save();
    res.status(201).json({ msg: "post added successfully" });
} catch (error) {
  res.status(501).json({ msg: "post add fail",errors:error });
}
};



// exports.Register(
//   "/",
//   [
//     auth,
//     check("country", "Text is required")
//       .not()
//       .isEmpty(),
//     check("dateStart", "dest is required")
//       .not()
//       .isEmpty(),
//     check("dateEnd", "safety is required")
//       .not()
//       .isEmpty(),
//     check("description", "cost is required")
//       .not()
//       .isEmpty()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(500).json({ errors: errors.array() });
//     }
// ​
//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       const newPost = new Post({
//         country: req.body.country,
//         dateEnd: req.body.dateEnd,
//         dateStart: req.body.dateStart,
//         description: req.body.description,
        
//         user: req.user.id
//       });
//       const post = await newPost.save();
//       res.json(post);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send("Server errors");
//     }
//   }
// );