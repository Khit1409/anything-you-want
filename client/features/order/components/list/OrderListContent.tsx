"use client";
import OrderList from "./OrderList";
import OrderListContextProvider from "../../contexts/OrderListContext";

export default function OrderListContent() {
  return (
    <OrderListContextProvider>
      <OrderList />
    </OrderListContextProvider>
  );
}
