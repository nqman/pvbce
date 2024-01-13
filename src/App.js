import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import MainLayout from "./modules/home/components/MainLayout";
import Catalogue from "./modules/catalogue/pages/Catalogue";
import CreateEquipment from "./modules/catalogue/components/CreateEquipment/CreateEquipment";
import EquipDetails from "./modules/catalogue/components/EquipDetails/EquipDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/catalogue/:code" element={<EquipDetails />} />
        </Route>
        <Route path="/create" element={<CreateEquipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
