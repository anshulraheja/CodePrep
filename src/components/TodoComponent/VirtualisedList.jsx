import { useState } from 'react';

const ROW_HEIGHT = 40;
const VISIBLE_COUNT = 10;

export default function VirtualisedList({ todos }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const endIndex = startIndex + VISIBLE_COUNT;

  const visibleTodos = todos.slice(startIndex, endIndex);

  return (
    <div
      style={{
        height: ROW_HEIGHT * VISIBLE_COUNT,
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: todos.length * ROW_HEIGHT, position: 'relative' }}>
        {visibleTodos.map((todo, i) => {
          const index = startIndex + i;
          return (
            <div
              key={todo.id}
              style={{
                position: 'absolute',
                top: index * ROW_HEIGHT,
                height: ROW_HEIGHT,
                lineHeight: ROW_HEIGHT + 'px',
                padding: '0 8px',
              }}
            >
              {todo.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
