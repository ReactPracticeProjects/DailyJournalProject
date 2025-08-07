export const journalEntriesReducer = (state, action) => {
  switch (action.type) {
    case "add_entry":
      const entriesToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        entries: [...state.entries, ...entriesToAdd],
      };

    case "add_TrashEntry":
      const entriesToAddTrash = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        trashedEntries: [...state.trashedEntries, ...entriesToAddTrash],
      };

    case "toggle_pinned":
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload
            ? { ...entry, isPinned: !entry.isPinned }
            : entry
        ),
      };

    case "deleteForever":
      return {
        ...state,
        trashedEntries: state.trashedEntries.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "restore":
      return {
        ...state,
        entries: [
          ...state.entries,
          state.trashedEntries.find((item) => item.id === action.payload),
        ],
        trashedEntries: state.trashedEntries.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "setTrash": {
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        trashedEntries: [
          ...state.trashedEntries,
          state.entries.find((item) => item.id === action.payload),
        ],
        entries: state.entries.filter((item) => item.id !== action.payload),
      };
    }

    case "update_entry": {
      console.log(action.itemid);
      console.log(action.payload);
      return {
        ...state,
        entries: state.entries.map((item) =>
          item.id === action.itemid ? action.payload : item
        ),
      };
    }

    default:
      return state;
  }
};
