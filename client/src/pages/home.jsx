import Slider from "../component/slider"
import ProudctList from '../component/proudct_list'
import { useContext, useEffect, useState } from "react"
import Category from "../component/category"
import FeatureProduct from "../component/feature_product"
import { searcContext } from "../context/searchcontext"
function Home() {
const {searchMode}=useContext(searcContext)
  useEffect(() => {
    console.log("home component re-render")
  })
  return (
    <>
      {
        searchMode ? <>
          <ProudctList />
        </> : (
          <>
            <Slider />
            <Category />
            <FeatureProduct />
          </>
        )
      }
    </>
  )
}
export default Home