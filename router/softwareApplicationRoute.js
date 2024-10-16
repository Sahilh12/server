const express = require('express')
const { isAuthMiddleware } = require('../auth/authentication')
const { addApplication, getAllApplication, deleteApplication, getApplication } = require('../controller/softwareApplicationController')

const router = express.Router()


router.post("/add", isAuthMiddleware, addApplication)
router.get("/getAll",isAuthMiddleware, getAllApplication)
router.get("/getAll/:id", getApplication)
router.delete('/delete/:id', isAuthMiddleware, deleteApplication)


module.exports = router