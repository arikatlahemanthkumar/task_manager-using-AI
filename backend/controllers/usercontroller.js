import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const userCtrl ={}

userCtrl.register= async(req,res)=>{
    console.log('Registration request body:', req.body);
    const body = req.body

    try{
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password,salt)
        
        const user = new User({
            name: body.name,
            email: body.email,
            password: hashPassword
        })
        
        await user.save()
        return res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email } })
    }catch(err){
        console.log('Registration error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" })
        }
        return res.status(400).json({ message: "Registration failed", error: err.message })
    }
}

userCtrl.login=async(req,res)=>{
    console.log('Login request body:', req.body);
    const {email,password} = req.body

    try{
        console.log('Looking for user with email:', email);
        const user = await User.findOne({email})
        console.log('User found:', user ? 'Yes' : 'No');
        
        if(!user){
            console.log('User not found for email:', email);
            return res.status(400).json({message:"Invalid email or password"})
        }
        
        console.log('Comparing passwords...');
        const isValidUser = await bcryptjs.compare(password , user.password)
        console.log('Password comparison result:', isValidUser);
        
        if(!isValidUser){
            console.log('Invalid password for user:', email);
            return res.status(400).json({message:"Invalid email or password"})
        }
        
        console.log('Login successful for user:', email);
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"10d"})
        res.json({
            token: token,
            user:{_id:user._id,name:user.name,email:user.email}
        })
    }catch(err){
        console.log("login Error :",err)
        return res.status(400).json({message:"Login failed"})
    }
}

userCtrl.account =async(req,res)=>{
    try{
        const user = await User.findById(req.currentUser.userId)
        if(!user){
            return res.status(404).json({errors:"user not found"})
        }
        res.json(user)
    }catch(err){
        return res.status(500).json({errors:err.message})
    }
}

userCtrl.forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"If an account with that email exists, a password reset link has been sent."})
        }
        res.json({message:"If an account with that email exists, a password reset link has been sent."})
    }catch(err){
        return res.status(500).json({message:"Something went wrong"})
    }
}

userCtrl.resetPassword = async(req,res)=>{
    try{
        const {token, newPassword} = req.body
        res.json({message:"Password reset successfully"})
    }catch(err){
        return res.status(500).json({message:"Password reset failed"})
    }
}

userCtrl.debugUsers = async(req,res)=>{
    try{
        const users = await User.find({}, {password: 0});
        res.json({users: users});
    }catch(err){
        return res.status(500).json({message:"Failed to fetch users", error: err.message})
    }
}

userCtrl.debugDeleteUser = async(req,res)=>{
    try{
        const {email} = req.body;
        const result = await User.deleteOne({email});
        res.json({message: `Deleted ${result.deletedCount} user(s)`, email: email});
    }catch(err){
        return res.status(500).json({message:"Failed to delete user", error: err.message})
    }
}

export default userCtrl