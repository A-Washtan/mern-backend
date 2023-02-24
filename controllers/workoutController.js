const Workout = require('../models/workoutsmodel')
const mongoose = require('mongoose');

// get all Workout
const getWorkouts = async (req, res) => {
    const user_id = req.user_id

    const Workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(Workouts)
}

// get a single Workout
const getWorkout = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'لم يتم العثور على الطلب' })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: 'لم يتم العثور على الطلب' })
    }
    res.status(200).json(workout)
}

// create new Workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'يرجى تعبئة الحقول', emptyFields })
    }
    // add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'لم يتم العثور على الطلب' })
    }
    const workout = await Workout.findByIdAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'لم يتم العثور على الطلب' })
    }
    res.status(200).json(workout)

}

// update a Workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'لم يتم العثور على الطلب' })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'لم يتم العثور على الطلب' })
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}