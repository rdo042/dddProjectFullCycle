import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });

    it("should throw error when customerId is empty", () => {

        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");

    });

    it("should throw error when Item is empty", () => {

        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");

    });

    it("should calculate total", () => {

        const item1 = new OrderItem("1", "Item 1", "P1", 100, 2);
        const item2 = new OrderItem("2", "Item 2", "P2", 100, 1);

        const order = new Order("1", "001", [item1]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("2", "002", [item1, item2]);

        total = order2.total();

        expect(total).toBe(300);

    });

    it("should check if the item qtd is greater than 0", () => {

        expect(() => {
            const item1 = new OrderItem("1", "Item 1", "P1", 100, 0);
            const order = new Order("1", "001", [item1]);

        }).toThrowError("Quantity must be greater than 0");

       

    });

});