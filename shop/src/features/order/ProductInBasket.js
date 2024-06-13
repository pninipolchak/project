import { useDispatch } from "react-redux";
import { addToBasket, decreseAmountInProduct, deleteFromBasket, increseAmountInProduct, setCurrentProduct } from "../order/orderSlice";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useState } from "react";




const ProductInBasket = ({ product }) => {

    let imgurl = window.location.origin + '/images/' + product.urlImg + ".webp"
    let disp = useDispatch();
    let [amount, setAmount] = useState(1);

    return (<>

        
        <div className="card flex justify-content-center">
            {/*  */}
            <h2 style={{ fontFamily: "unset", fontSize: 40 }}>{product.productName}</h2>
            {/* <h2 >{product.description}</h2> */}
            <Divider layout="vertical" />
            <img className="w-3 shadow-2 border-round" src={imgurl} alt={product.productName} />
            <Divider layout="vertical" />
            <div className="card flex flex-column align-items-center">
                
                <h2>₪{product.cost} :מחיר</h2>
                <h2>{amount} :כמות</h2>
                <h2>{product.cost * product.amount} :סה"כ מחיר למוצר זה</h2>
                <div className="flex flex-wrap gap-3">
                    <Button icon="pi pi-plus" className="p-button-outlined p-button-rounded p-button-success"
                        onClick={() => {
                            disp(increseAmountInProduct(product));
                            setAmount(amount + 1);
                        }}></Button>

                    <Button icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger"
                        onClick={() => disp(deleteFromBasket(product._id))}></Button>

                    <Button icon="pi pi-minus" className="p-button-outlined p-button-rounded p-button-success"
                        onClick={() => {
                            disp(decreseAmountInProduct(product));
                            setAmount(amount - 1);
                        }}></Button>
                </div>
            </div>
        </div>


        <Divider />
    </>);
}

export default ProductInBasket;