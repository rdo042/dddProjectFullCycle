import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("1", "Ronaldo Orling");

const address = new Address("Rua João Américo Watsko", 691, "88309-800", "Itajai");

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", "REF-P1", 10, 15);
const item2 = new OrderItem("1", "Item 2", "REF-P1", 10, 15);

let listaItens: OrderItem[] = [];
listaItens.push(item1);
listaItens.push(item2);

const order = new Order("1", "123", listaItens);


