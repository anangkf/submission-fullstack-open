import React from 'react'
import StatisticLine from './StatisticLine';

const Statistics = ({data}) => {
  const { good, neutral, bad, totalFeedback, average, positivePrecentage } = data;
  const statisticsData = [
    {text:'good', value: good},
    {text:'neutral', value: neutral},
    {text:'bad', value: bad},
    {text:'all', value: totalFeedback},
    {text:'average', value: average},
    {text:'positive', value: positivePrecentage},
  ]

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          {statisticsData.map(({text, value}, idx) =>{
            return (
              <StatisticLine key={idx} text={text} value={value} />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Statistics