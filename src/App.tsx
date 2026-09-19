import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ComingSoonPage />} />

        {/*Jobbar på just nu*/}
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;