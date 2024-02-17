import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import MainLayout from "./modules/home/components/MainLayout";
import Catalogue from "./modules/catalogue/pages/Catalogue";
import CreateEquipment from "./modules/catalogue/components/CreateEquipment/CreateEquipment";
import EquipDetails from "./modules/catalogue/components/EquipDetails/EquipDetails";
import EditEquipment from "./modules/catalogue/components/CreateEquipment/EditEquipment";
import Report from "./modules/report/pages/Report";
import DocumentManagement from "./modules/library/pages/DocumentManagement";
import NotFound from "./modules/home/components/NotFound";
import SignUp from "./modules/authentication/pages/SignUp";
import SignIn from "./modules/authentication/pages/SignIn";
import AdminManagement from "./admin/AdminManagement";
import VerifyUser from "./modules/authentication/pages/VerifyUser";
import ForgotPassword from "./modules/authentication/pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/catalogue/:code" element={<EquipDetails />} />
          <Route path="/report" element={<Report />}></Route>
          <Route path="/library" element={<DocumentManagement />}></Route>
        </Route>
        {/* authentication */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/verify/:code" element={<VerifyUser />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminManagement />}></Route>

        <Route path="/catalogue/create" element={<CreateEquipment />} />
        <Route path="/catalogue/edit/:id" element={<EditEquipment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
