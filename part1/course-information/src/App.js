import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.courseName}</h1>
    );
}

const Content = (props) => {
    return (
        <div>
            <Part partName={props.courseParts[0].name} partExercise={props.courseParts[0].exercises} />
            <Part partName={props.courseParts[1].name} partExercise={props.courseParts[1].exercises} />
            <Part partName={props.courseParts[2].name} partExercise={props.courseParts[2].exercises} />
        </div>
    );
}

const Part = (props) => {
    return (
        <p>{props.partName} {props.partExercise}</p>
    );
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.courseParts[0].exercises + props.courseParts[1].exercises + props.courseParts[2].exercises}</p>
    );
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header courseName={course.name} />
            <Content courseParts={course.parts}/>
            <Total courseParts={course.parts}/>
        </div>
    );
}

export default App