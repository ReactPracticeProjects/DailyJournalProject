import React, { useContext } from 'react'
import Card from './Card'
import { JournalEntryData } from '../../context/JournalContext';
import useJournalContext from '../../hooks/useJournalContext';

const Cards = () => {
  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);
    
  const d = useJournalContext();
  console.log(d)

  // Sort entries: pinned entries first, then unpinned entries
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
     <div className='grid  md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
        {
          sortedEntries.map((JournalEntry,index)=>{
            return <Card key={JournalEntry.id} id={JournalEntry.id} Journaldispatch={Journaldispatch} data={JournalEntry}/>
          })
        }
       </div>
  )
}

export default Cards
