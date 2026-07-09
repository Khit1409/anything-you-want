import ManagerOrderContextProvider from "../../contexts/ManagerOrderContext";
import OrderTable from "./OrderTable";
import FilterOrderBar from "./FilterOrderBar";

export default function ManagerOrderContent() {
  return (
    <ManagerOrderContextProvider>
      <FilterOrderBar />
      <OrderTable />
    </ManagerOrderContextProvider>
  );
}
