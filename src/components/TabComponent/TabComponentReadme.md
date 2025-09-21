### Separation of concerns

- Each tab (Profile, Interests, Settings) is its own component → modular and easier to maintain.
- Centralized TabContainer manages state and navigation → good abstraction.

### Reusable tab system

- Passing a tabList with title + component makes it easy to add new tabs without changing the container logic.

### Performance-conscious

- Wrapping TabButton in memo is a solid decision to avoid unnecessary re-renders
