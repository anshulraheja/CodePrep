import TodoList from './TodoList';

export default function TodoComponent() {
  const todoList = [
    {
      id: 1,
      text: 'abc',
      isCompleted: false,
    },
    {
      id: 2,
      text: 'xyz',
      isCompleted: true,
    },
  ];
  return <TodoList intitialData={todoList} />;
}
