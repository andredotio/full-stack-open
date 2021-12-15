import React, { useState } from 'react'

const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const DailyAnecdote = ({ anecdotes, votes, selected }) => {
    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
        </div>
    )
}

const WinnerAnecdote = ({ anecdotes, votes }) => {
    let maxValue = 0;
    let maxIndex = 0;

    for (let i = 1; i < votes.length; i++) {
        if (votes[i] > maxValue) {
            maxValue = votes[i]
            maxIndex = i
        }
    }

    return (
        <div>
            <p>{anecdotes[maxIndex]}</p>
            <p>has {votes[maxIndex]} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const getRandomIndex = () => {
        const index = Math.floor(Math.random() * anecdotes.length)
        setSelected(index)
    }

    const updateVotes = () => {
        const updatedVotes = [...votes]
        updatedVotes[selected] += 1
        setVotes(updatedVotes)
    }

    return (
        <div>
            <Header text="Anecdote of the day" />
            <DailyAnecdote anecdotes={anecdotes} votes={votes} selected={selected} />
            <Button handleClick={updateVotes} text="vote" />
            <Button handleClick={getRandomIndex} text="next anecdote" />
            <Header text="Anecdote with most votes" />
            <WinnerAnecdote anecdotes={anecdotes} votes={votes} />
        </div>
    )
}

export default App