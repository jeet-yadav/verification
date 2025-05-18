import { Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";

import Aurora from "./blocks/Backgrounds/Aurora/Aurora";
import ShapeBlur from "./blocks/Backgrounds/ShapeBlur/ShapeBlur";

function App() {
  return (
    <div className="h-screen overflow-hidden bg-green-600">
      <div className="absolute z-1 top-0 left-0 w-full h-full overflow-hidden">
        <Aurora />
      </div>
      <div className="z-2 min-h-screen  flex items-center justify-center relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
