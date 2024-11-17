import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletAuth from "./components/Wallet";
import Social from "./components/social"; // Import the social page component
import LandingPage from "./components/Landing";

function App() {
  return (
    <Router>
      <div className="m-0 p-0 h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/social" element={<Social />} />
          <Route path="/auth" element={<WalletAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
