import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
        
    async create(entity: Order): Promise<void> {
        
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        },
        {
            include: [{model: OrderItemModel}],
        }
        );
    }

    async update(entity: Order): Promise<void> {

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
            include: [{model: OrderItemModel}],
        },
        {
            where: {
                id: entity.id
            },
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({ 
                where: { 
                    id, 
                },
                include: [{model: OrderItemModel}],
                rejectOnEmpty: true,
            },
            );
        } catch (error) {
            throw new Error("Order not found");
        }

        let items = orderModel.items.map((itemModel) => {
            let it = new OrderItem(
                itemModel.id,
                itemModel.name,
                itemModel.product_id,
                itemModel.price,
                itemModel.quantity
            )
            
            return it;
        });

        const order = new Order(id, orderModel.customer_id, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        
        
        const orderModel = await OrderModel.findAll({
            include: [{model: OrderItemModel}],
        });

        const orders = orderModel.map((orderModel) => {

            let items = orderModel.items.map((itemModel) => {
                let it = new OrderItem(
                    itemModel.id,
                    itemModel.name,
                    itemModel.product_id,
                    itemModel.price,
                    itemModel.quantity
                )
                
                return it;
            });

            let order = new Order(orderModel.id, orderModel.customer_id, items);
            
            return order;
            
        });

        return orders;
    }
    

    

    


}