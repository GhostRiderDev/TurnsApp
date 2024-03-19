import DashBoard from "@/components/DashBoard";
import Fields from "@/components/Fields";
import TurnForm from "@/components/TurnForm";
import Turns from "@/components/Turns";
import { Route, Routes } from "react-router";

function UserPanel() {
  return (
    <div className="flex gap-x-8">
      <DashBoard />
      <Routes>
        <Route path="/turns" element={<Turns />} />
        <Route path="/" element={<Turns />} />
        <Route path="/turns/add" element={<TurnForm />} />
        <Route path="/fields" element={<Fields />} />
      </Routes>
    </div>
  );
}

export default UserPanel;
