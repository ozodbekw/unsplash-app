import { Outlet } from "react-router-dom";

// components
import { Navbar } from "../components";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
