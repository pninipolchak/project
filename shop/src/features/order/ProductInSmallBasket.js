
import { useDispatch } from "react-redux";
import { addToBasket, decreseAmountInProduct, deleteFromBasket, increseAmountInProduct, setCurrentProduct } from "../order/orderSlice";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useState } from "react";




const ProductInBasket = ({ product }) => {

    let imgurl = window.location.origin + '/images/' + product.urlImg + ".webp"
    let disp = useDispatch();

    return (<>

        
        <div className="card flex justify-content-center">
            <h2 style={{ fontFamily: "unset", fontSize: 40 }}>{product.productName}</h2>
            <Divider layout="vertical" />
            <img className="w-3 shadow-2 border-round" src={imgurl} alt={product.productName} />
            <Divider layout="vertical" />

        </div>


        <Divider />
    </>);
}

export default ProductInBasket;









// // import { useDispatch } from "react-redux";
// // import { addToBasket,decreseAmountInProduct,deleteFromBasket,increseAmountInProduct,setCurrentProduct } from "./orderSlice";

// const ProductInSmallBasket = ({ product }) => {

    
//     // let disp = useDispatch();
    
//     return ( <>
//         <h2>{product.productName}</h2>
//         <h2>{product.cost}</h2>
//         <h3>{product.amount}</h3>

//         {/* <h2>{product.cost*product.amount}</h2>//for all amount */}
//         <h2>{product.description}</h2>
//         {/* <a href={"details/"+product._id} target="_blank" onClick={()=>{disp(setCurrentProduct(product))}}>לפרטים<img src={product.urlImg} /></a> */}
//         <img src={product.urlImg} />
        
    
//      </>);
// }
 
// export default ProductInSmallBasket;