//CASOS DE USO DOS ITENS

// -> criar item com subtotal certo
async function createItem(name, price, quantity) {
  return {
    name,
    price,
    quantity,
  };
}

async function calculateSubtotal(item) {
  return item.price * item.quantity;
}   

export { createItem, calculateSubtotal };
