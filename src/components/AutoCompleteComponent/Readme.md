input box
Make API call, show on the page

### optimisation

Debouncing
Caching

### Explantion

Working of deboucning API call

1. User types "c"

searchTerm becomes "c".

useEffect runs because searchTerm changed.

Inside useEffect:

Sets a timeout: after 300ms, call fetchData("c").

Return cleanup function clearTimeout(timeout) is registered.

(No API call yet, just a timer started.)

2. Before 300ms, user types "a" → now "ca"

searchTerm updates again.

useEffect runs again.

First thing React does: it runs the cleanup from the previous effect → clearTimeout(timeout) → cancels the "c" timer.

Then new effect body executes:

Creates a new timeout for "ca" → after 300ms, call fetchData("ca").

(Old "c" request is cancelled, "ca" request is now pending.)

**What if useState is to define cache**

✅ Pros

- Reactive: if you want to show the cache (like debugging UI), updates will re-render automatically.
- Simple to reason about if you treat cache like state.

❌ Cons

- Every cache update causes a re-render, even if the UI doesn’t depend on it → unnecessary renders.
- Cache can get large (hundreds of queries) → repeated re-renders = performance cost.
- Cache isn’t really UI state, it’s just an internal store.
