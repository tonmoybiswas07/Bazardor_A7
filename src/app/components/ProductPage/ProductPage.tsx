import ProductByHignPrice from "../ProductByHighPrice/ProductByHignPrice";
import ProductByLowPrice from "../ProductByLowPrice/ProductByLowPrice";


const ProductPage = () => {
    return (
        <div>
           <ProductByHignPrice/> 
           <ProductByLowPrice/>
        </div>
    );
};

export default ProductPage;