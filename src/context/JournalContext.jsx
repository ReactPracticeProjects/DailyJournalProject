import { Children, createContext, useReducer } from "react";
import { journalEntriesReducer } from "../reducers/JournalEntriesReducer";

export const JournalEntryData = createContext();

const initialState = {
  entries: [],
  trashedEntries: [],
};

const JournalContext = ({ children }) => {
  const [Journalstate, Journaldispatch] = useReducer(journalEntriesReducer, initialState);

  return (
    <JournalEntryData.Provider value={[Journalstate, Journaldispatch]}>
      {children}
    </JournalEntryData.Provider>
  );
};

export default JournalContext;
