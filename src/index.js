import * as cartService from "./services/cart.js";
import {createItem} from "./services/item.js";

const myCart = [];
const myWhishList = [];

console.log("Welcome to your Shopee Cart!");

//criando dois itens
const item1 = await createItem("hotwheels ferrari", 20.99, 1);
const item2 = await createItem("hotwheels lamborghini", 50, 4);

// adicionei dois itens ao carrinho
await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);

await cartService.removeItem(myCart, item2);
await cartService.removeItem(myCart, item2);

await cartService.displaycart(myCart);
await cartService.calculateTotal(myCart);
await cartService.calculateTotalWithDiscount(myCart);

console.log(); 
console.log("Welcome to your Shopee Wishlist Cart!");

const wishItem1 = await createItem("hotwheels Aston Martin", 15.99, 1);
const wishItem2 = await createItem("hotwheels Porche 911", 49.99, 2);

await cartService.addItem(myWhishList, wishItem1);
await cartService.addItem(myWhishList, wishItem2);

await cartService.displaycart(myWhishList);
await cartService.calculateTotal(myWhishList);
await cartService.calculateTotalWithDiscount(myWhishList);

console.log();

await cartService.moveItem(myWhishList, myCart, wishItem1);

await cartService.displaycart(myCart);
await cartService.calculateTotal(myCart);
await cartService.calculateTotalWithDiscount(myCart);
