import uploadOnCloudinary from "../config/cloudinary.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

// ✅ ADD LISTING
export const addListing = async (req, res) => {
  try {
    const host = req.userId
    const { title, description, rent, city, landmark, category } = req.body

    // ✅ Validate required fields
    if (!title || !description || !rent || !city || !landmark || !category) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // ✅ Safe image extraction
    const image1Path = req.files?.image1?.[0]?.path
    const image2Path = req.files?.image2?.[0]?.path
    const image3Path = req.files?.image3?.[0]?.path

    if (!image1Path || !image2Path || !image3Path) {
      return res.status(400).json({ message: "All 3 images are required" })
    }

    // ✅ Upload to Cloudinary
    const image1 = await uploadOnCloudinary(image1Path)
    const image2 = await uploadOnCloudinary(image2Path)
    const image3 = await uploadOnCloudinary(image3Path)

    // ✅ Create listing
    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host
    })

    // ✅ Update user
    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    )

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    // ✅ Success response
    return res.status(201).json(listing)

  } catch (error) {
    console.log("ADD LISTING ERROR:", error)
    return res.status(500).json({
      message: "Error while adding listing",
      error: error.message
    })
  }
}

// ✅ GET ALL LISTINGS
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.find().sort({ createdAt: -1 })

    return res.status(200).json(listing)

  } catch (error) {
    console.log("GET LISTING ERROR:", error)
    return res.status(500).json({
      message: "Error while fetching listings",
      error: error.message
    })
  }
}