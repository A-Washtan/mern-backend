const express = require('express');
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// get all
router.get('/', getWorkouts)

// get one
router.get('/:id', getWorkout)

// post new
router.post('/', createWorkout)

// delete one
router.delete('/:id', deleteWorkout)

// updet one
router.patch('/:id', updateWorkout)


module.exports = router