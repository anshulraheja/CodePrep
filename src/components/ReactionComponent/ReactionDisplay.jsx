import React, { useEffect } from 'react';
import { useReaction } from './ReactionContext';
const ReactionDisplay = () => {
  const { reactions } = useReaction();

  console.log('Rendering ReactionDisplay');
  return (
    <div>
      {reactions.map((r) => (
        <span key={r.id} style={{ margin: '5px', fontSize: '2rem' }}>
          {r.icon}
        </span>
      ))}
    </div>
  );
};

export default ReactionDisplay;
