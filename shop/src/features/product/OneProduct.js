import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import SmallBasket from "../order/SmallBasket";
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { deleteProduct } from "./productApi";


const OneProduct = ({ product }) => {

    let disp = useDispatch();
    let currentUser = useSelector(state => state.user.currentUser);
    const op = useRef(null);
    let navigate = useNavigate();

    const delProduct = () => {
        let isDelete = window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?");
        if (isDelete) {
            deleteProduct(product._id, currentUser.token)
                .then((res) => {
                    if (res.status == 200) {
                        alert(`המוצר ${product.productName}נמחק בהצלחה`);
                        window.open("/loveFlower/list")
                    }
                })
                .catch((err) => {
                    alert(err.message)
                    console.log(err)
                })
        }
    }
    let imgurl = window.location.origin + '/images/' + product.urlImg + ".webp"

    return (<>
        
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag"></i>
                        <span className="font-semibold">{product.category}</span>
                    </div>
                    
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <Link to={"" + product._id} ><img className="w-9 shadow-2 border-round" src={imgurl} alt={product.productName} /></Link>
                    <div className="text-2xl font-bold">{product.productName}</div>
                    
                    
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">₪{product.cost}</span>
                    {currentUser && currentUser.role == 'USER' && <Button icon="pi pi-shopping-cart" className="p-button-rounded"
                        onClick={(e) => {
                            op.current.toggle(e);
                            disp(addToBasket(product));
                        }} 
                    ></Button>}
                    <OverlayPanel ref={op}><SmallBasket /></OverlayPanel>


                    {currentUser && currentUser.role == 'ADMIN' && <Button type="Button" onClick={delProduct} label="מחיקה" />}
                    {currentUser && currentUser.role == 'ADMIN' && <Button type="Button" label="עריכה" onClick={() => {
                        navigate("/loveFlower/admin/update/" + product._id);
                    }} />}

                </div>
            </div>
        </div>
    </>);
}

export default OneProduct;