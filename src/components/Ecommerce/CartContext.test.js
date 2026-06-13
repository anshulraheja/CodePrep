import { cartReducer, initialCartState } from './CartContext';

const product = {
  id: 1,
  name: 'Keyboard',
  price: 49.99,
};

describe('cartReducer', () => {
  it('adds a new item and increments its quantity when added again', () => {
    const stateAfterFirstAdd = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: product,
    });
    const stateAfterSecondAdd = cartReducer(stateAfterFirstAdd, {
      type: 'ADD_ITEM',
      payload: product,
    });

    expect(stateAfterSecondAdd.items).toEqual([{ ...product, quantity: 2 }]);
    expect(stateAfterSecondAdd.totalAmount).toBeCloseTo(99.98);
  });

  it('decrements an item and removes it when its quantity reaches zero', () => {
    const state = {
      items: [{ ...product, quantity: 2 }],
      totalAmount: 99.98,
    };

    const stateAfterFirstRemove = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: product,
    });
    const stateAfterSecondRemove = cartReducer(stateAfterFirstRemove, {
      type: 'REMOVE_ITEM',
      payload: product,
    });

    expect(stateAfterFirstRemove.items).toEqual([{ ...product, quantity: 1 }]);
    expect(stateAfterFirstRemove.totalAmount).toBeCloseTo(49.99);
    expect(stateAfterSecondRemove).toEqual(initialCartState);
  });

  it('returns the existing state when removing an item that is not in the cart', () => {
    const state = {
      items: [{ ...product, quantity: 1 }],
      totalAmount: product.price,
    };

    expect(
      cartReducer(state, {
        type: 'REMOVE_ITEM',
        payload: { id: 2 },
      })
    ).toBe(state);
  });

  it('clears the cart without reusing the initial items array', () => {
    const clearedState = cartReducer(
      {
        items: [{ ...product, quantity: 1 }],
        totalAmount: product.price,
      },
      { type: 'CLEAR_CART' }
    );

    expect(clearedState).toEqual(initialCartState);
    expect(clearedState.items).not.toBe(initialCartState.items);
  });
});
