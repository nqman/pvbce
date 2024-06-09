import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./modules/authentication/pages/ChangePassword";

import ForgotPassword from "./modules/authentication/pages/ForgotPassword";
import ProfileUser from "./modules/authentication/pages/ProfileUser";
import SignIn from "./modules/authentication/pages/SignIn";
import SignUp from "./modules/authentication/pages/SignUp";
import VerifyUser from "./modules/authentication/pages/VerifyUser";
import CreateEquipment from "./modules/catalogue/components/CreateEquipment/CreateEquipment";
import EditEquipment from "./modules/catalogue/components/CreateEquipment/EditEquipment";
import EquipDetails from "./modules/catalogue/components/EquipDetails/EquipDetails";
import Catalogue from "./modules/catalogue/pages/Catalogue";
import MainLayout from "./modules/home/components/MainLayout";
import NotFound from "./modules/home/components/NotFound";
import Home from "./modules/home/pages/Home";
import DocumentManagement from "./modules/library/pages/DocumentManagement";
import ActualCosts from "./modules/report/components/ActualCosts";
import Category from "./modules/report/components/Category";
import CreateProject from "./modules/report/components/CreateProject";
import ProjectDetail from "./modules/report/components/ProjectDetail";
import ProjectManagement from "./modules/report/components/ProjectManagement";
import Report from "./modules/report/pages/Report";

import CostName from "./modules/report/components/CostName";
import QuantityRevenues from "./modules/report/components/QuantityRevenues";
import RpActualCostAndQuantityRevenue from "./modules/report/components/RpActualCostAndQuantityRevenue";
import UserManagement from "./admin/UserManagement";
import EditProject from "./modules/report/components/EditProject";
import RpCostTotal from "./modules/report/components/RpCostTotal";
import CategoryProject01 from "./modules/report/components/CategoryProject01";
import CategoryProject02 from "./modules/report/components/CategoryProject02";
import CategoryLibrary01 from "./modules/library/components/CategoryLibrary01";
import Categorylibrary02 from "./modules/library/components/CategoryLibrary02";

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
          <Route path="/report/edit-project/:code" element={<EditProject />} />

          <Route path="/report/rpcosttotal" element={<RpCostTotal />} />
          <Route
            path="/report/listprojects"
            element={<ProjectManagement />}
          ></Route>
          <Route path="/projects/:code" element={<ProjectDetail />} />

          {/* ActualQuantityRevenue */}
          <Route
            path="/projects/actual-quantity-revenue/:code"
            element={<QuantityRevenues />}
          />

          {/* ActualCost */}
          <Route path="/projects/actual-cost/:code" element={<ActualCosts />} />
          <Route
            path="/projects/report-cost-quantity-revenue/:code"
            element={<RpActualCostAndQuantityRevenue />}
          />

          {/* LIBRARY */}
          <Route path="/library" element={<DocumentManagement />}></Route>

          {/* INPUT (SETTING) */}
          <Route path="/setup/categorylist" element={<Category />} />
          <Route path="/setup/costlist" element={<CostName />} />
          <Route
            path="/setup/category01-project"
            element={<CategoryProject01 />}
          />
          <Route
            path="/setup/category02-project"
            element={<CategoryProject02 />}
          />

          <Route
            path="/setup/category01-library"
            element={<CategoryLibrary01 />}
          />
          <Route
            path="/setup/category02-library"
            element={<Categorylibrary02 />}
          />
          {/* Profile */}
          <Route path="/profile" element={<ProfileUser />}></Route>
          <Route path="/user-management" element={<UserManagement />}></Route>
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

        <Route path="/catalogue/create" element={<CreateEquipment />} />
        <Route path="/catalogue/edit/:id" element={<EditEquipment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
