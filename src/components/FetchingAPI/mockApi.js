// mockApi.js
// Simulates backend with random delay & failures

function mockFetch(url) {
  return new Promise((resolve, reject) => {
    // Simulate 1–2s network delay
    const delay = 100;

    setTimeout(() => {
      // 20% chance of failure
      if (Math.random() < 0.2) {
        reject({ status: 500, message: 'Internal Server Error' });
        return;
      }

      // Routing simulation
      if (url === 'https://mock.api.com/users') {
        resolve([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Charlie' },
        ]);
      } else if (url.startsWith('https://mock.api.com/users/')) {
        const userId = url.split('/')[4];
        // User 3 has no cart
        if (userId === '3') {
          resolve({ cartId: null });
        } else {
          resolve({ cartId: 100 + Number(userId) });
        }
      } else if (url.startsWith('https://mock.api.com/carts/')) {
        const cartId = url.split('/')[4];
        // Cart 102 is empty
        if (cartId === '102') {
          resolve([]);
        } else {
          resolve([
            { productId: 'p1', name: 'Laptop', price: 1000 },
            { productId: 'p2', name: 'Mouse', price: 50 },
          ]);
        }
      } else {
        reject({ status: 404, message: 'Not Found' });
      }
    }, delay);
  });
}

export default mockFetch;
