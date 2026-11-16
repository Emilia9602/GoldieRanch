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
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/shop/ContactPage";
import Footer from "./components/shop/Footer";
import ReturnsPage from "./pages/shop/ReturnsPage";
import PrivacyPolicyPage from "./pages/shop/PrivacyPolicyPage";

//Lägg till sök på desktop
//Kontakt - ljus - kanske bara mail men jag ansvarar?
//Sök ska funka
//Footer - fixa!
//Vanliga frågor?
//Styla hamburgermenyn med alla flikar
//Navigering för admin - ordrar senare? Vad behövs för säkerhet?
//En produktsida
//Shop sidan - kunna välja kategori, först visa alla produkter
//Första sidan, fixa som vi vill ha
//Städa kod i admin, dela upp mer?
//Hero på homepage?
//Rabatt? Rea - Ingen retur? Kolla lagar
//Ljuskalkylatorn - lägg in senare så att priset räknas med moms, vinst m.m
//Ljuskalkylatorn - Role admin kunna se priser, role staff ej priser
//Behandlings sida, info
//Presentkort - lägg in
//Retur sida
//Frakt tid - hur lång?
//Ska det heta "shop" eller något annat?
//Login ska ha egen länk till oss att komma direkt till
//Badges, populär, nyhet, rea, slutsåld, limited addition. Lägg in logik  för det

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar />

        <Routes>

          <Route path="/" element={<ComingSoonPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

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

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;