import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from './productApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../order/orderSlice";
import SmallBasket from "../order/SmallBasket";
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';


const ProductDetails = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let disp = useDispatch();
  const op = useRef(null);
  let [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setCurrentProduct(res.data);
        console.log(res.data);
      })
      .catch(err => { console.log(err) })

  }, []);

  let imgurl = window.location.origin + '/images/' + currentProduct.urlImg + ".webp"
  let currentUser = useSelector(st => st.user.currentUser);
  return (<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-0" style={{
    position: "fixed",
    top: 0,
    width: "100vw",
    height: "100vh",
  }}
    key={currentProduct._id}>

    <div className="p-4 border-9 surface-border surface-card border-round">

      <h1 style={{ fontFamily: "monospace" }}>{currentProduct.productName}</h1>
<h3 style={{ fontFamily: "monospace" }}>₪{currentProduct.cost}</h3>
      <Divider align="left">
        {/* <div className="card flex justify-content-left"> */}
          {currentUser && currentUser.role == 'USER' && <Button icon="pi pi-shopping-cart" className="p-button-rounded"
            onClick={(e) => {
              disp(addToBasket(currentProduct));
              op.current.toggle(e);
            }} />}
          <OverlayPanel ref={op}><SmallBasket /></OverlayPanel>
        {/* </div> */}
      </Divider>
      <div className="card flex justify-content-center">
      
      <img className="w-3 shadow-2 border-round" src={imgurl} alt={currentProduct.productName}
      />
     
      <Divider layout="vertical" />
      <p style={{fontSize:40}}>{ currentProduct.description}</p> </div>
      <Divider align="center">
        <Button className="p-button-outlined" onClick={() => {
          navigate(-1)
        }}>  חזרה לדף המוצרים </Button>
      </Divider>

    </div>
  </div>);
}

export default ProductDetails;




