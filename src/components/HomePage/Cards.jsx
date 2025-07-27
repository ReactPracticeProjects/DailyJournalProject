import React, { useContext } from 'react'
import Card from './Card'
import { JournalEntryData } from '../../context/JournalContext';

const Cards = () => {


  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);

  return (
     <div className='grid  md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
        {
          entries.map((JournalEntry,index)=>{
            return <Card key={JournalEntry.id} id={JournalEntry.id} Journaldispatch={Journaldispatch} data={JournalEntry}/>
          })
        }
       </div>
  )
}

export default Cards
