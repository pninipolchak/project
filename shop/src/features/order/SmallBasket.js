import { useSelector } from "react-redux";
import ProductInSmallBasket from "./ProductInSmallBasket";

const SmallBasket = () => {
    let basket = useSelector(st=>st.order.basket);
    // let basket = JSON.parse(localStorage.getItem("basket"));
    return (<div style={{backgroundColor:"red"}}>
    <h1>המוצרים שכבר בחרת</h1>
        <ul>
            {basket.map(item=> <li key={item._id}> <ProductInSmallBasket product={item}/></li>)}
        </ul>
    </div>);
}
 
export default SmallBasket;