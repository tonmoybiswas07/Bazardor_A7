import HeroBanner from "./components/Bannar/Bannar";
import Marquee from "./components/Marquee/Marquee";
import ProductPage from "./components/ProductPage/ProductPage";



export default function Home() {
  return (
    <div>
     <Marquee/>
     <HeroBanner/>
     <ProductPage/>
    </div>
  );
}
