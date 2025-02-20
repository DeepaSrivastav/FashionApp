import { Outlet, BrowserRouter as Router, RouterProvider } from "react-router-dom";
import Routes from './Routes'
import { AuthProvide } from "./context/AuthContext";
import Header from "./components/Header/header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import router from "./Routes";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading/>; 
  }
  return (
    <AuthProvide>
    <RouterProvider router={router}/>
    </AuthProvide>

   
  )
}

export default App;