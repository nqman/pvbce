import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import MainLayout from "./modules/home/components/MainLayout";
import Catalogue from "./modules/catalogue/pages/Catalogue";
import EquipmentItem from "./modules/catalogue/components/EquipmentItem/EquipmentItem";
import CreateEquipment from "./modules/catalogue/components/CreateEquipment/CreateEquipment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/catalogue/:code" element={<EquipmentItem />} />
        </Route>
        <Route path="/create" element={<CreateEquipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
