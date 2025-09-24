useCallback is used here to make the onToggle and deleteTodo references stable, so that React.memo can actually skip re-renders of TodoItem.

Without useCallback

Every time the parent (TodoList) re-renders (for example, when you type in the input box), new function references are created for onToggle and deleteTodo.

Even though the code inside is the same, React sees:

With useCallback

useCallback returns the same function reference between renders,

unless the dependencies in the array change ([] means “never change”).

---

🔹 Core feature improvements

Edit todo inline → Right now you can only add/delete/toggle. Users should be able to update text.

Mark all complete / clear completed → Batch actions are common in todos.

Reordering (drag-and-drop) → Nice UX for prioritization.

Persistent storage → Use localStorage or API integration so todos survive reloads.

Filtering → Show All / Active / Completed items.

🔹 UX & accessibility

Keyboard accessibility → Full support for tab, enter, delete keys.

Error handling UX → Inline errors styled properly, maybe with ARIA role="alert".

Empty state UI → When no todos, show a friendly message.

Confirmation for delete → Prevent accidental deletes.

🔹 Performance / scalability

Virtualized list → For large datasets (you already asked about this 😏).

Stable IDs → Consider server-generated IDs if connected to backend.

Optimistic updates → If syncing with API, update UI instantly, rollback on failure.

🔹 Advanced enhancements

Dark mode / theming → Configurable styling.

Due dates & reminders → Realistic feature in todos.

Tags / categories → For grouping todos.

Animations → Smooth transitions when adding/removing todos.
