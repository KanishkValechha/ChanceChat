// import { useState } from 'react'
import LandingPage from "./components/Landing";
import { Features, About } from "./components/Feature";
// import Social from "./components/social";

function App() {
  return (
    <>
      <div className="m-0 p-0 h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <LandingPage />
        <Features />
        <About />
      </div>
      {/* <Social /> */}
    </>
  );
}

export default App;
