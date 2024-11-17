import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletAuth from "./components/Wallet";
import Social from "./components/social";
import LandingPage from "./components/Landing";
import { Navigate } from "react-router-dom";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("walletConnected");

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="m-0 p-0 h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<WalletAuth />} />
          <Route
            path="/social"
            element={
              <ProtectedRoute>
                <Social />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
