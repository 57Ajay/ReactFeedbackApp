import { useState } from "react";
import PropTypes from 'prop-types';
import "./App.css";

const Button = ({ eventHandler, text }) => {
  return (
    <button onClick={eventHandler}>{text}</button>
  );
};

Button.propTypes = {
  eventHandler: PropTypes.func.isRequired,
  text: PropTypes.string
};

const Statistics = (props) => {
  const { good, bad, neutral } = props;

  return (
    <div className="statistics-container">
      <p className="statistics-item">Good: {good}</p>
      <p className="statistics-item">Bad: {bad}</p>
      <p className="statistics-item">Neutral: {neutral}</p>
      <p className="statistics-item">All: {good + neutral + bad}</p>
      <p className="statistics-item">Average: {((good - bad) / (good + neutral + bad))}</p>
      <p className="statistics-item">Positive: {(good / (good + neutral + bad))}</p>
    </div>
  );
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired
};

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [arrayVote, setArrayVote] = useState(Array(anecdotes.length).fill(0));

  const goodClick = () => setGood(good + 1);
  const badClick = () => setBad(bad + 1);
  const neutralClick = () => setNeutral(neutral + 1);

  const random = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    const UpdateArrayVote = [...arrayVote];
    UpdateArrayVote[selected] += 1;
    setArrayVote(UpdateArrayVote);
  };

  return (
    <div className="container">
      <h1>Give feedback</h1>
      <div className="feedback-buttons">
        <Button eventHandler={goodClick} text="good" />
        <Button eventHandler={neutralClick} text="neutral" />
        <Button eventHandler={badClick} text="bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
      <div className="anecdote-container">
        <h1>Anecdote of the day</h1>
        <h2>{anecdotes[selected]}</h2>
        <Button eventHandler={random} text="next anecdote" />
      </div>
      <div className="vote-container">
        <h3>Has {arrayVote[selected]} Vote</h3>
        <Button eventHandler={vote} text="vote" />
      </div>
      <div className="anecdote-container">
        <h1>Anecdote with most votes</h1>
        <h2>{anecdotes[arrayVote.indexOf(Math.max(...arrayVote))]}</h2>
      </div>
    </div>
  );
};

export default App;
