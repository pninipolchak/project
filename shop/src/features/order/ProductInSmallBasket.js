// import { useDispatch } from "react-redux";
// import { addToBasket,decreseAmountInProduct,deleteFromBasket,increseAmountInProduct,setCurrentProduct } from "./orderSlice";

const ProductInSmallBasket = ({ product }) => {

    
    // let disp = useDispatch();
    
    return ( <>
        <h2>{product.productName}</h2>
        <h2>{product.cost}</h2>
        <h3>{product.amount}</h3>

        {/* <h2>{product.cost*product.amount}</h2>//for all amount */}
        <h2>{product.description}</h2>
        {/* <a href={"details/"+product._id} target="_blank" onClick={()=>{disp(setCurrentProduct(product))}}>לפרטים<img src={product.urlImg} /></a> */}
        <img src={product.urlImg} />
        
    
     </>);
}
 
export default ProductInSmallBasket;