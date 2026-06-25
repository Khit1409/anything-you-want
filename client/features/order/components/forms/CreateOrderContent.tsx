import CreateOrderContextProvider from "../../contexts/CreateOrderContext";
import CreateOrderForm from "./CreateOrderForm";

export default function CreateOrderContent() {
  return (
    <CreateOrderContextProvider>
      <CreateOrderForm />
    </CreateOrderContextProvider>
  );
}
