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
import ChangePassword from "./modules/authentication/pages/ChangePassword";
import CreateProject from "./modules/report/components/CreateProject";
import Category from "./modules/report/components/Category";
import ProjectManagement from "./modules/report/components/ProjectManagement";
import ProjectDetail from "./modules/report/components/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/catalogue/:code" element={<EquipDetails />} />
          {/* REPORT */}
          <Route path="/report" element={<Report />}></Route>
          <Route path="/report/create-project" element={<CreateProject />} />
          <Route path="/report/category" element={<Category />} />
          <Route
            path="/report/listprojects"
            element={<ProjectManagement />}
          ></Route>
          <Route path="/projects/:code" element={<ProjectDetail />} />

          <Route path="/library" element={<DocumentManagement />}></Route>
        </Route>

        {/* authentication */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/verify/:code" element={<VerifyUser />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/change-password/:code"
          element={<ChangePassword />}
        ></Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminManagement />}></Route>

        <Route path="/catalogue/create" element={<CreateEquipment />} />
        <Route path="/catalogue/edit/:id" element={<EditEquipment />} />

        {/* REPORT */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
