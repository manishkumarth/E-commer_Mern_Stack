import { useContext } from "react";
import Slider from "../component/slider";
import Category from "../component/category";
import FeatureProduct from "../component/feature_product";
import ProudctList from '../component/proudct_list';
import { searcContext } from "../context/searchcontext";

function Home() {
  const { searchMode, search } = useContext(searcContext);

  // Show ProductList when:
  // - AI search is active (searchMode = true), OR
  // - User has typed something in search
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