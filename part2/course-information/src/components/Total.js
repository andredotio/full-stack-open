import React from 'react'

const Total = ({ courseParts }) => {
    const courseExercises = courseParts.reduce((total, coursePart) => {
        return total += coursePart.exercises
    }, 0)

    return (
        <h3>total of {courseExercises} exercises</h3>
    )
}

export default Total