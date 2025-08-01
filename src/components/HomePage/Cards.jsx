import React, { useContext, useMemo } from 'react'
import Card from './Card'
import { JournalEntryData } from '../../context/JournalContext';

const Cards = ({searchTerm}) => {
  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);

  
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [entries]);


  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedEntries;
    return entries.filter((item) => 
      item.title.toLowerCase().includes(searchTerm) || 
      item.content.toLowerCase().includes(searchTerm)
    );
  }, [entries, searchTerm, sortedEntries]);

  return (
     <div className='grid pb-10  md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
      {searchTerm ? (
        filteredData.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <h1 className="text-lg font-semibold text-gray-600">No entries found matching "{searchTerm}"</h1>
          </div>
        ) : (
          filteredData.map((filterentry, index) => (
            <Card key={filterentry.id} id={filterentry.id} Journaldispatch={Journaldispatch} data={filterentry}/>
          ))
        )
      ) : (
        sortedEntries.map((JournalEntry, index) => (
          <Card key={JournalEntry.id} id={JournalEntry.id} Journaldispatch={Journaldispatch} data={JournalEntry}/>
        ))
      )}
     </div> 
  )
}

export default Cards
