const User= require ("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



 require("dotenv").config({path :"./config/.env"})

 const secretOrKey = process.env.secretOrKey;

//  exports.register= async(req,res)=>{


// const searcheResult=await User.findOne({email});
// if(searcheResult) return res.status(401).json({msg:"user existieren"})
// try{
// const newUser = new User({
// pseudo,
// email,
// password,
    
// })
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(password , salt);

// newUser.password = hash;
// await newUser.save();
// res.status(201).json({msg:"user added successfully"})

// }catch(error){
//     res.status(501).json({msg:"User add fail"})
// }

//  };

exports.register = async (req, res) => {
    const { pseudo, email, phoneNumber, password } = req.body;
    try {
        const searcheResult = await User.findOne({ email });
        if (searcheResult) return res.status(401).json({ msg: "user existieren" });
      const newUser = new User({
        pseudo,
        email,
        phoneNumber,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      newUser.password = hash;
      await newUser.save();
      res.status(201).json({ msg: "user added successfully" });
    } catch (error) {
      res.status(501).json({ msg: "User add fail", errors:error });
    }
  };

exports.login = async (req,res)=>{
const { email , password} = req.body;

const user = await User.findOne({ email});

if(!user) return res.status(400).json({msg :"Wrong email"})

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch) return res.status(400).json({msg:"Wrong password"})


try {
    const payload ={

      pseudo: user.pseudo,
      //change email.user to user.email
        email:user.email,
        id: user._id
    }
  //change res.status(200).json({token:`Bearer ${token}`,msg:'login success'}) to res.status(200).json({token:`Bearer ${token}`})
    const token = await jwt.sign(payload,secretOrKey);
    res.status(200).json({ token: `Bearer ${token}` })
    
} catch (error) {
    console.log("Login error",error);
    res.status(500).json({msg:"login fail"});
}


} 

