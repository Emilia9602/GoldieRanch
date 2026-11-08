import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import ShopPage from "./pages/shop/ShopPage";
import Navbar from "./pages/partials/navbar/Navbar";
import LoginPage from "./pages/admin/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditProductPage from "./pages/admin/EditProductPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AddProductPage from "./pages/admin/AddProductPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";

//Lägg till sök på desktop
//Sök ska funka
//Footer
//Navigering för admin - ordrar senare? Vad behövs för säkerhet?
//En produktsida
//Shop sidan - kunna välja kategori, först visa alla produkter
//Första sidan, fixa som vi vill ha
//Städa kod i admin, dela upp mer?
//Hero på homepage?
//Rabatt?
//Behandlings sida, info
//Presentkort - lägg in
//Kontakt sida
//Retur sida
//Ska det heta "shop" eller något annat?
//Not found page
//Login ska ha egen länk till oss att komma direkt till
//Badges, mest populär, nyhet eller liknande. Lägg in logik direkt för det

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
              <AdminProductsPage />
            </ProtectedRoute>
          } />

          <Route path="/admin/products/:id" element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          } />

          <Route
            path="/admin/add/product"
            element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategoriesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;