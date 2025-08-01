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

    // Load entries if they exist
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // Ensure all entries have isPinned property
        const entriesWithPinned = parsedData.map(entry => ({
          ...entry,
          isPinned: entry.isPinned !== undefined ? entry.isPinned : false
        }));
        Journaldispatch({ type: "add_entry", payload: entriesWithPinned });
      } catch (error) {
        console.error("Error parsing journal entries:", error);
      }
    }

    // Load trash data if it exists
    if (trashData) {
      try {
        const parsedTrashData = JSON.parse(trashData);
        Journaldispatch({ type: "add_TrashEntry", payload: parsedTrashData });
      } catch (error) {
        console.error("Error parsing trash data:", error);
      }
    }
  }, []);

  // 💾 Sync to localStorage when state changes (only if not empty)
  useEffect(() => {
    if (Journalstate.entries.length > 0) {
      localStorage.setItem("journalEntry", JSON.stringify(Journalstate.entries));
    }
  }, [Journalstate.entries]);

  useEffect(() => {
    if (Journalstate.trashedEntries.length > 0) {
      localStorage.setItem("journalTrash", JSON.stringify(Journalstate.trashedEntries));
    }
  }, [Journalstate.trashedEntries]);

  return (
    <JournalEntryData.Provider value={[Journalstate, Journaldispatch]}>
      {children}
    </JournalEntryData.Provider>
  );
};

export default JournalContext;
