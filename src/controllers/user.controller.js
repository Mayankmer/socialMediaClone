import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async(req, res) => {
    /*
        step1: get user detail from frontend
        step2: validation - not empty
        step3: check if the user already exists: username, email
        step4: check for images, avatars
        step5: upload them to cloudinary
        step6: create user object - create entry in db
        step7: remove password and refresh token field from response
        step8: check for user creation
        step9: return response
    */
   const {userName, email, fullName, password} = req.body
   console.log(userName, email, password)

//    if(fullName === ""){
//     throw new ApiError(400, "fullname is required")
//    }

    if(
        //checking if any of the field returns true or any field is empty
        [userName, email, fullName, password].some((field) => 
            field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({$or: [{email}, {userName}]})

    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    //getting the local path of the avatar and cover image file
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }

    //uploading avatar and cover image on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "avatar file is required")
    }

    //creating user and storing in the db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    //checking if user is successfully created
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken")
    
    if(!createdUser){
        throw new ApiError(500, "user not created")
    }

    //sending back the response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export {registerUser}