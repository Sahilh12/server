const express = require('express')
const { isAuthMiddleware } = require('../auth/authentication')
const { addTimeline, getAllTimeline, deleteTimeline, getTimelines } = require('../controller/timelineController')

const router = express.Router()


router.post("/add", isAuthMiddleware, addTimeline)
router.get("/getAll",isAuthMiddleware, getAllTimeline)
router.get('/getAll/:id' , getTimelines)
router.delete('/delete/:id', isAuthMiddleware, deleteTimeline)


module.exports = router