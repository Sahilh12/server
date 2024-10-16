const { catchAsyncError } = require('../middlewares/catchAsyncError.js')
const { ErrorHandler } = require('../middlewares/error.js')
const softwareApplicationModel = require('../models/softwareApplicationSchema.js')
const { v2 } = require('cloudinary')


module.exports.addApplication = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.values(req.files) <= 0) {
        console.log(req.files);

        return next(new ErrorHandler('Please upload a file', 400))
    }

    const { svg } = req.files

    const cloudinaryResponseForApp = await v2.uploader.upload(
        svg.tempFilePath,
        { folder: "APPLICATION" }
    )

    const application = await softwareApplicationModel.create({
        userId:req.user,
        name: req.body.name,
        svg: {
            public_id: cloudinaryResponseForApp.public_id,
            url: cloudinaryResponseForApp.secure_url
        }
    })

    res.status(200).json({
        success: true,
        message: "Application added successfully!",
        application
    })
})

module.exports.getAllApplication = catchAsyncError(async (req, res, next) => {
    const allApplication = await softwareApplicationModel.find({userId:req.user})
    res.status(200).json({ allApplication })
})
module.exports.getApplication = catchAsyncError(async (req, res, next) => {
    const allApplication = await softwareApplicationModel.find({userId:req.params.id})
    res.status(200).json({ allApplication })
})

module.exports.deleteApplication = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const application = await softwareApplicationModel.findById(id)
    console.log(application);

    if (!application) {
        return next(new ErrorHandler("Application not found", 404))
    }
    await application.deleteOne()
    res.status(200).json({
        message: "Application deleted successfully"
    })
})