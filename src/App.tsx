import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import ShopPage from "./pages/ShopPage";
import Navbar from "./pages/partials/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminPage from "./pages/AdminPage";

//Lägg till sök på desktop

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar />

        <Routes>

          <Route path="/" element={<ComingSoonPage />} />

          {/*Jobbar på just nu*/}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;