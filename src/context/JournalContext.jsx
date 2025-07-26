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

    if (data) {
      const parsedData = JSON.parse(data);

      // Dispatch the flat array to reducer
      Journaldispatch({ type: "add_entry", payload: parsedData });
    }
  }, []);

  // 💾 Optional but better: Sync to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("journalEntry", JSON.stringify(Journalstate.entries));
  }, [Journalstate.entries]);

  return (
    <JournalEntryData.Provider value={[Journalstate, Journaldispatch]}>
      {children}
    </JournalEntryData.Provider>
  );
};

export default JournalContext;
