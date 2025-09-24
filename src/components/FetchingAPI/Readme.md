### Base Problem

You are given three APIs:

API 1 – Returns a list of user objects (with id fields).

API 2 – Given a user id, returns the cart id for that user.

API 3 – Given a cart id, returns the list of products in that cart.

Task

Fetch the data from these APIs in the correct order:

First, get the user id(s) from API 1.

Then, use that id to get the corresponding cart id(s) from API 2.

Finally, fetch the cart’s products using API 3.

Ensure that all calls for multiple users/carts are handled efficiently.

Display the final result in a structured format (e.g., a list of users with their cart products).

Follow-Ups (Level by Level)
Level 1 – Error Handling

Handle cases where any of the API calls fail (network error, invalid id, empty result).

Ensure that partial data doesn’t break the whole flow.

Level 2 – Performance

Instead of making calls one by one, optimize the fetching of cart ids and product data when multiple users exist.

Level 3 – UI Integration

Build a simple UI where:

Clicking a button triggers the data fetching sequence.

While data is loading, show a loading indicator.

Once loaded, display user → cart → products in a hierarchical way.

Level 4 – Advanced Enhancements

Add a retry mechanism for failed API calls (retry up to 3 times before showing an error).

Add a cancel mechanism (user clicks cancel before all requests complete).

Paginate the product list if it is large.

👉 This way, you’ll first solve the core chaining & Promise.all problem (the original JPMC question), and then push yourself into error handling, optimization, UI, and robustness—exactly the kinds of things an SDE-2 interviewer might probe deeper into.

---

### The rule of thumb for dependency arrays

- Always include everything your function/effect touches from the outside scope: props, state, or other callbacks.

- If something is constant or wrapped in another useCallback/useMemo with stable deps, you can safely skip extra dependencies.
