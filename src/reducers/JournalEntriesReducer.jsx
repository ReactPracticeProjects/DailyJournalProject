export const journalEntriesReducer = (state, action) => {
  switch (action.type) {
    case "add_entry":
      // Always flatten the payload into entries array
      const entriesToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        entries: [...state.entries, ...entriesToAdd], // Flattened structure
      };

    default:
      return state;
  }
};
