import { createContext, useEffect, useReducer } from "react";
import { journalEntriesReducer } from "../reducers/JournalEntriesReducer";

export const JournalEntryData = createContext();

const initialState = {
  entries: [],
  trashedEntries: [],
};

const JournalContext = ({ children }) => {
  const [Journalstate, Journaldispatch] = useReducer(
    journalEntriesReducer,
    initialState
  );

  // 🔁 Fetch initial data from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem("journalEntry");
    const trashData = localStorage.getItem("journalTrash");

    if (data && trashData) {
      const parsedData = JSON.parse(data);
      const parsedTrashData = JSON.parse(trashData);

      // Ensure all entries have isPinned property
      const entriesWithPinned = parsedData.map(entry => ({
        ...entry,
        isPinned: entry.isPinned !== undefined ? entry.isPinned : false
      }));

      // Dispatch the flat array to reducer
      Journaldispatch({ type: "add_entry", payload: entriesWithPinned });
      Journaldispatch({type:"add_TrashEntry",payload:parsedTrashData})
    }
  }, []);

  // 💾 Optional but better: Sync to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("journalEntry", JSON.stringify(Journalstate.entries));
  }, [Journalstate.entries]);

  useEffect(()=>{
    localStorage.setItem("journalTrash",JSON.stringify(Journalstate.trashedEntries))
  },[Journalstate.trashedEntries])

  return (
    <JournalEntryData.Provider value={[Journalstate, Journaldispatch]}>
      {children}
    </JournalEntryData.Provider>
  );
};

export default JournalContext;
