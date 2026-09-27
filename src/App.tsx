import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import ShopPage from "./pages/ShopPage";
import Navbar from "./pages/partials/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import EditProductPage from "./pages/EditProductPage";

//Lägg till sök på desktop
//Kolla hover på admin lägg till knapp, som ska va samma överallt
//SKU, antal, variationer, bild att ladda upp, kategori
//Navigering till admin, anpassat
//En produktsida
//Första sidan, fixa som vi vill ha
//Hero på homepage?
//Rabatt?
//Admin, se alla produkter
//Hur loggar vi in?
//Kontakt sida
//Anpassa lägg till till desktop

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

          <Route path="/admin/products/:id" element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;