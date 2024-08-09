import { calculateSubtotal } from "./item.js";

//quais açoes meu carrinho pode fazer

//CASOS DE USO
// ✅ -> adicionar item no carrinho
async function addItem(userCart, item) {
  userCart.push(item);
}

// ✅ -> calcular o total do carrinho
async function calculateTotal(userCart) {
  console.log("\nShopee Cart TOTAL IS:");

  const subtotals = await Promise.all(userCart.map(item => calculateSubtotal(item)));
  const result = subtotals.reduce((total, subtotal) => total + subtotal, 0);

  console.log(`🎁Total: ${result.toFixed(2)}`);
}

// -> deletar item do carrinho
async function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}

// -> ✅ remover um item - diminui um item
async function removeItem(userCart, item) {
  //1. encontrar o indice do item
  const indexFound = userCart.findIndex((p) => p.name === item.name);

  //2. Caso não encontre o item
  if (indexFound == -1) {
    console.log("item não encontrado");
    return;
  }

  //3. item > 1 subtrair um item
  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
    return;
  }

  //4. caso item = 1 deletar o item
  if (userCart[indexFound].quantity == 1) {
    userCart.splice(indexFound, 1);
    return;
  }
}

// ✅ mostra todos os items do carrinho
async function displaycart(userCart) {
  console.log("\nShopee cart list:");
  for (let index = 0; index < userCart.length; index++) {
    const item = userCart[index];
    const subtotal = await calculateSubtotal(item);
    console.log(
      `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)} | ${
        item.quantity
      }x | Subtotal = ${subtotal.toFixed(2)}`
    );
  }
}

async function moveItem(fromList, toList, item) {
    const itemIndex = fromList.findIndex(cartItem => cartItem.name === item.name);
    
    if (itemIndex !== -1) {
        // Remove o item da lista original 
        fromList.splice(itemIndex, 1);
        
        // Adiciona o item a lista destino
        await addItem(toList, item);

        console.log(`Moved "${item.name}" from one list to the other.`);
    } else {
        console.log(`Item "${item.name}" not found in the source list.`);
    }
}

function applyDiscount(item) {
    const discountThreshold = 30; // Itens a cima de $30 recebem disconto
    const discountRate = 0.10; // 10% de disconto

    if (item.price > discountThreshold) {
        item.price = item.price * (1 - discountRate);
    }
}

async function applyDiscounts(cart) {
    for (let item of cart) {
        applyDiscount(item);
    }
}

async function calculateTotalWithDiscount(cart) {
    await applyDiscounts(cart);

    let total = 0;

    for (let item of cart) {
        total += item.price * item.quantity;
    }
    console.log(`Total after discounts: $${total.toFixed(2)}`);

    return total;
}

export { addItem, calculateTotal, deleteItem, removeItem, displaycart, moveItem, calculateTotalWithDiscount };
