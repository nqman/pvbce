import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import MainLayout from "./modules/home/components/MainLayout";
import Catalogue from "./modules/catalogue/pages/Catalogue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
