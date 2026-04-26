import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Slider from "../component/slider";
import Category from "../component/category";
import FeatureProduct from "../component/feature_product";
import ProudctList from '../component/proudct_list';

import { searcContext } from "../context/searchcontext";

function Home() {
  const { searchMode, search } = useContext(searcContext);
  const { user, role } = useSelector((state) => state.user || {});   // ← Fixed: use state.auth
  const navigate = useNavigate();

  // Redirect Admin & Seller to their dashboard
  useEffect(() => {
    if (role === "admin" || role === "seller") {
      navigate("/admin_dashboard", { replace: true });
    }
  }, [role, navigate]);

  // Show loading while checking role
  // if (!user || !role) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-500">Loading...</p>
  //     </div>
  //   );
  // }

  // // If user is Admin or Seller → they are already redirected, so this won't run
  // // But we keep it as safety
  // if (role === "admin" || role === "seller") {
  //   return null;
  // }

  const showProductList = searchMode || search.trim().length > 0;

  return (
    <>
      {showProductList ? (
        <ProudctList />
      ) : (
        <>
          <Slider />
          <Category />
          <FeatureProduct />
        </>
      )}
    </>
  );
}

export default Home;