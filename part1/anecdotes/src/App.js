import { useState } from "react";
import Anecdotes from "./components/Anecdotes";
import Button from "./components/Button";
import MostVoted from "./components/MostVoted";

const INIT_POINTS = [0, 0, 0, 0, 0, 0, 0, 0];

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const App = () => {
  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const [points, setPoints] = useState(INIT_POINTS);

  const handleVote = () => {
    const newPoints = [...points]; 
    newPoints[selected] += 1;
    setPoints(newPoints);
  }
  
  const mostVoted = points.indexOf(Math.max(...points));
  
  return (
    <>
      <Anecdotes data={anecdotes} points={points} selected={selected} />

      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={nextAnecdote} />

      <MostVoted data={anecdotes} mostVoted={mostVoted} />
    </>
  );
}

export default App;
