import React, { useContext } from 'react';
import { createContext } from 'react';

const ReactionContext = createContext();

export function ReactionProvider({ children }) {
  const [reactions, setReactions] = React.useState([]);

  const addReaction = (reaction) => {
    const id = Date.now();
    console.log("setting id: ", id)
    setReactions((prev) => [...prev, { ...reaction, id }]);

    // auto-remove after 2s
    setTimeout(() => {
      console.log("removing id", id);
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  return (
    <ReactionContext.Provider value={{ reactions, addReaction }}>
      {children}
    </ReactionContext.Provider>
  );
}

export const useReaction = () => useContext(ReactionContext);
