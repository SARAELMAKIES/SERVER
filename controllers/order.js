import { orderModel } from "../models/order.js"
import { userModel } from "../models/user.js"
//שליפת כל ההזמנות
export const getAllOrders = async (req, res) => {
    let { limit = 2, page = 1 } = req.query;
    try {
        let data = await orderModel.find().skip((page - 1) * limit).limit(limit);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all orders", message: err.message })

    }
}
//הוספת הזמנה

export const addOrder = async (req, res) => {
    let { body } = req;
    if (!body.address || !body.products || !body.userId)
        return res.status(404).json({ title: "cannot add orders", message: "address,products,userId are require" })


    try {
        let user = await userModel.findById(body.userId);
        if (!user)
            return res.status(404).json({ title: "no such user", message: "no such user in the store" });
        let newOrder = new orderModel(body);
        await newOrder.save();
        res.json(newOrder);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ title: "cannot add this order", message: err.message })
    }
}

//מחיקת הזמנה רק אם ההזמנה לא יצא לדרך
export const deleteOrderByID = async (req, res) => {
    let { id } = req.params;

    try {
        let order = await orderModel.findById(id);
        if (!order)
            return res.status(404).json({ title: "cannot find order by id", message: "order with such id not found" });
        if (order.isSend == true)
            return res.status(400).json({ title: "cannot delete order gone out", message: "The order has gone out" })
        let data = await orderModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "order with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot delete", message: err.message });
    }
};
//שליפת כל ההזמנות של משתמש מסוים
export const getByUserId = async (req, res) => {
    try {
        let data = await orderModel.find({ userId: req.params.id });
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "order with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get by id", message: err.message });
    }
};
//עדכון סטטוס ההזמנה לנשלחה
export const updateStatusOrder = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findByIdAndUpdate(id, { isSend: true }, { new: true });
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "order with such id not found" });
        res.json(data)

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message });

    }
}