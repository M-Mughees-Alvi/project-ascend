export function CartReducer(state, action) {
  const item = action.payload;
  const exists = item ? state.items.find((i) => i.id === item.id) : null;
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = exists
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...state.items, { ...item, quantity: 1 }];

      return {
        items: updatedItems,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      };
    }

    case "REMOVE_ITEM": {
      if (!exists) return state;
      return {
        items: state.items.filter((i) => i.id !== item.id),
        totalItems: state.totalItems - item.quantity,
        totalPrice: state.totalPrice - item.price * item.quantity,
      };
    }
    case "INCREASE_QUANTITY": {
      if (!exists) return state;
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      };
    }
    case "DECREASE_QUANTITY": {
      if (!exists) return state;
      const updatedItems =
        exists.quantity === 1
          ? state.items.filter((i) => i.id !== item.id)
          : state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
            );

      return {
        items: updatedItems,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - exists.price,
      };
    }
    case "CLEAR_CART": {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }
    default: {
      return state;
    }
  }
}
