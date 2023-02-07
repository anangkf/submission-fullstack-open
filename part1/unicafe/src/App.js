import { useState } from "react";
import Button from "./compnents/Button";
import Statistics from "./compnents/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const rateGood = () => {
    setGood(good + 1)
  }

  const rateNeutral = () => {
    setNeutral(neutral + 1)
  }

  const rateBad = () => {
    setBad(bad + 1)
  }

  const totalFeedback = good + neutral + bad;
  const average = (good - bad) / totalFeedback;
  const positivePrecentage = `${(good / totalFeedback * 100).toFixed(1)}%`;
  
  return (
    <>
      <h1>Give your feedback</h1>
      <Button text='good' onClick={rateGood}/>
      <Button text='neutral' onClick={rateNeutral}/>
      <Button text='bad' onClick={rateBad}/>

      {totalFeedback 
        ? <Statistics data={{good, neutral, bad, totalFeedback, average, positivePrecentage}}/>
        : <p>No feedback given.</p>
      }
      
    </>
  );
}

export default App;
