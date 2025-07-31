import React from "react";

import Card from "../HomePage/Card";
import TrashCard from "./TrashCard";
import useJournalContext from "../../hooks/useJournalContext";
import useTheme from "../../hooks/useTheme";

const Trash = () => {
  const [entry, trashentry, journalDispatch] = useJournalContext();
 
  const theme = useTheme();
  const trashentryCount = trashentry.length;
  return (
    <div className="px-5 py-7 md:px-10 lg:px-10  xl:px-30 xl:py-10 pb-18 mx-auto max-w-8xl flex-col flex-grow min-h-screen">
      <div className="flex flex-col space-y-2">
        <p className="text-3xl font-semibold">Trash</p>
        <p className="text-slate-500">{trashentryCount} deleted Entry</p>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-3 mt-4">
          {trashentryCount > 0 ? (
            trashentry.map((trashData, index) => {
              return (
                <TrashCard key={trashData.id}
                  trashData={trashData}
                  id={trashData.id}
                  journalDispatch={journalDispatch}
                />
              );
            })
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center h-[350px]">
              <span className="text-7xl">🗑️</span>
              <p className="font-semibold text-2xl">Trash is empty</p>
              <p className="text-slate-500">Deleted entries will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trash;
