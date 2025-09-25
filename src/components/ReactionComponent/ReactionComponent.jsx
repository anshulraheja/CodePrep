import React from 'react';
import ReactionButton from './ReactionButton';
import { ReactionProvider } from './ReactionContext';
import ReactionDisplay from './ReactionDisplay';

const ReactionComponent = () => {
  const REACTION_TYPES = [
    { id: 0, icon: '👍' },
    { id: 1, icon: '❤️' },
    { id: 2, icon: '😂' },
    { id: 3, icon: '😮' },
    { id: 4, icon: '😢' },
    { id: 5, icon: '😡' },
  ];
  console.log('Rendering ReactionComponent');
  return (
    <div>
      <h1>Reaction Component</h1>
      <ReactionProvider>
        <ReactionButton reactionButtons={REACTION_TYPES} />
        <ReactionDisplay />
      </ReactionProvider>
    </div>
  );
};

export default ReactionComponent;
