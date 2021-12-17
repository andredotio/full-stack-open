import React from 'react'
import Part from './Part'

const Content = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(coursePart => {
                return (
                    <Part key={coursePart.id} partName={coursePart.name} partExercises={coursePart.exercises} />
                )
            })}
        </div>
    )
}

export default Content