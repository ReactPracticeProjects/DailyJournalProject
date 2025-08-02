import { useContext } from "react";
import { JournalEntryData } from "../context/JournalContext";

const useJournalContext = () => {
  const [{ entries, trashedEntries, draft }, Journaldispatch] =
    useContext(JournalEntryData);

  return [entries, trashedEntries, draft, Journaldispatch];
};

export default useJournalContext;
