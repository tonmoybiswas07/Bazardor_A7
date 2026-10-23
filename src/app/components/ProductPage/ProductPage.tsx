import AllProductPage from "@/app/AllProducts/page";
import ProductByHignPrice from "../ProductByHighPrice/ProductByHignPrice";
import ProductByLowPrice from "../ProductByLowPrice/ProductByLowPrice";


const ProductPage = () => {
    return (
        <div>
           <ProductByHignPrice/> 
           <ProductByLowPrice/>
           <AllProductPage/>
        </div>
    );
};

export default ProductPage;