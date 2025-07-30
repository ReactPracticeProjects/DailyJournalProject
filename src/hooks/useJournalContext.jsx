import { useContext } from "react";
import { JournalEntryData } from "../context/JournalContext";

const useJournalContext = () => {
  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);

  return [entries, trashedEntries, Journaldispatch];
};

export default useJournalContext;
