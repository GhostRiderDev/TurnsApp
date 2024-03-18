import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./views/Landing";
import UserPanel from "./views/UserPanel";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route
            path="/user/*"
            element={<ProtectedRoute children={<UserPanel />} />}
          />
          <Route path="/*" element={<Landing />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
