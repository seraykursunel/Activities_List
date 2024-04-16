import './styles.css'

import Header from './components/Header'
import ActivityCard from './components/ActivityCard'
import placeHolderData from './data/placeHolderData'
import { useEffect, useState } from 'react'


export default function App() {
 
  const savedActivityKeys = [
    8364626, 4688012, 6553978, 3699502, 9908721, 3136729, 5490351, 8827573,
    9318514, 1668223, 3192099, 9008639, 4894697, 8033599, 5675880, 7114122,
    4151544, 4558850, 3561421, 4286250,
  ]

  useEffect(()=>{
    const fetchData = async () => {
      try {
          const res = await Promise.all ( 
          savedActivityKeys.map( async (savedActivityKey)=>{
          const res = await fetch(`https://www.boredapi.com/api/activity?key=${savedActivityKey}`)
          return res.json()
          })
        )
        setActivitiesData(res)
      } catch (error) {
        console.log("Başarısız Promise")
      }
    }
    fetchData ()
  }, [])

  const [activitiesData, setActivitiesData] = useState([])
 

  const activityCardElements = activitiesData.map((activityData, index) => {
    const { key, ...otherProps } = activityData
    return <ActivityCard key={key} number={index + 1} {...otherProps} />
  })

  return (
    <div className='wrapper'>
      <Header />
      <div className='container'>{activityCardElements}</div>
    </div>
  )
}
