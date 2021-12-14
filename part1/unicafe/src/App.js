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

const StatisticLine = ({ text, value }) => {
    return (
        <p>{text} {value}</p>
    )
}

const Statistics = ({ reviews }) => {
    const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

    if (totalFeedback === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    const averageScore = (((reviews.good * 1) + (reviews.bad * -1)) / totalFeedback).toFixed(2);
    const positiveFeedback = ((reviews.good / totalFeedback) * 100).toFixed(2);
    
    return (
        <div>
            <StatisticLine text="good" value={reviews.good} />
            <StatisticLine text="neutral" value={reviews.neutral} />
            <StatisticLine text="bad" value={reviews.bad} />
            <StatisticLine text="all" value={totalFeedback} />
            <StatisticLine text="average" value={averageScore} />
            <StatisticLine text="positive" value={positiveFeedback + "%"} />
        </div>
    )
}

const App = () => {
    const [reviews, setReviews] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    const handleGood = () => {
        setReviews({ ...reviews, good: reviews.good + 1 })
    };

    const handleNeutral = () => {
        setReviews({ ...reviews, neutral: reviews.neutral + 1 })
    };

    const handleBad = () => {
        setReviews({ ...reviews, bad: reviews.bad + 1 })
    };

    return (
        <div>
            <Header text="give feedback" />
            <Button handleClick={handleGood} text="good" />
            <Button handleClick={handleNeutral} text="neutral" />
            <Button handleClick={handleBad} text="bad" />
            <Header text="statistics" />
            <Statistics reviews={reviews} />
        </div>
    )
}

export default App