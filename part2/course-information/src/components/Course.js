import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header courseName={course.name} />
                        <Content courseParts={course.parts} />
                        <Total courseParts={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course