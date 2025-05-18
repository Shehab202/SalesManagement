import { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/firebase";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/pages/Login";
import Inventory from "./components/pages/Inventory";
import SalesInvoice from "./components/pages/SalesInvoice";
import PurchaseInvoice from "./components/pages/PurchaseInvoice";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
const ProtectedRoute = ({ children }) => {
  
  const Navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user);
      setIsLoading(false);
      if (!user) {
        Navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (isAuthenticated) {
    return <Navigate to="/salesInvoice" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/purchaseInvoice"
          element={
            <ProtectedRoute>
              <PurchaseInvoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salesInvoice"
          element={
            <ProtectedRoute>
              <SalesInvoice />
            </ProtectedRoute>
          }
        />
<Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
