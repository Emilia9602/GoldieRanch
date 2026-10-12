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
//Modaler istället för alert på delete
//Kolla hover på admin lägg till knapp, som ska va samma överallt
//Ladda upp flera bilder
//Navigering till admin, anpassat
//En produktsida
//Första sidan, fixa som vi vill ha
//Hero på homepage?
//Rabatt?
//Hur loggar vi in?
//Kontakt sida
//Anpassa lägg till till desktop
//Error, loading state bättre, komponenter, confim också
//Styla kategori sidan
//Annat än alerts
//Not found page
//Login ska ha egen länk till oss att komma direkt till

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