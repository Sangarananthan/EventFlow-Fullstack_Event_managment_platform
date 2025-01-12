import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <Analytics />
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>
   </div>
    
  );
};

export default App;
