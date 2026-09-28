import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import ShopPage from "./pages/shop/ShopPage";
import Navbar from "./pages/partials/navbar/Navbar";
import LoginPage from "./pages/admin/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminPage from "./pages/admin/AdminPage";
import EditProductPage from "./pages/admin/EditProductPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";

//Lägg till sök på desktop
//Sök ska funka
//Footer
//Modaler istället för alert på delete
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
//Ändra så att adminpage inte ha lägg till som första?
//Error, loading state bättre, komponenter 
//Annat än alerts
//Not found page

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

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;