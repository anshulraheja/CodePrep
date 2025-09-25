import { useReaction } from './ReactionContext';

const ReactionButton = ({ reactionButtons }) => {
  const { addReaction } = useReaction();

  console.log('Rendering ReactionButton');
  return (
    <div>
      {reactionButtons.map((button) => (
        <button key={button.id} onClick={() => addReaction(button)}>
          {button.icon}
        </button>
      ))}
    </div>
  );
};
export default ReactionButton;
