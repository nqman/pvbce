import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import MainLayout from "./modules/home/components/MainLayout";
import Catalogue from "./modules/catalogue/pages/Catalogue";
import CreateEquipment from "./modules/catalogue/components/CreateEquipment/CreateEquipment";
import EquipDetails from "./modules/catalogue/components/EquipDetails/EquipDetails";
import EditEquipment from "./modules/catalogue/components/CreateEquipment/EditEquipment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/catalogue/:code" element={<EquipDetails />} />
        </Route>
        <Route path="/catalogue/create" element={<CreateEquipment />} />
        <Route path="/catalogue/edit/:id" element={<EditEquipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
