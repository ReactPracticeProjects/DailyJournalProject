import React, { useContext } from 'react'
import Card from './Card'
import { JournalEntryData } from '../../context/JournalContext';
import useJournalContext from '../../hooks/useJournalContext';

const Cards = ({searchTerm}) => {
  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);
    
  const d = useJournalContext();
  // console.log(d)

  // Sort entries: pinned entries first, then unpinned entries
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });


  const filteredData = searchTerm !== "" && entries.filter((item,index)=>item.title.toLowerCase().includes(searchTerm) || item.content.toLowerCase().includes(searchTerm) )
  console.log(filteredData)

  return (
     <div className='grid  md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
      
        { filteredData !== false ? filteredData.length === 0 ? (<h1>Nothing to show here with the match</h1>) : filteredData.map((filterentry,index)=> <Card key={filterentry.id} id={filterentry.id} Journaldispatch={Journaldispatch} data={filterentry}/>
        ):
          sortedEntries.map((JournalEntry,index)=> <Card key={JournalEntry.id} id={JournalEntry.id} Journaldispatch={Journaldispatch} data={JournalEntry}/>
          )
        }
       </div> 
  )
}

export default Cards
