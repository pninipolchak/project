import { useDispatch, useSelector } from "react-redux";
import ProductInBasket from "./ProductInBasket";
import { enterAdress } from "./orderSlice";
import { useState } from "react";
import { saveOrderInServer } from "./orderApi";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";


const Basket = () => {

    let disp = useDispatch();
    let basket = useSelector(state => state.order.basket);
    // let basket = JSON.parse(localStorage.getItem("basket"));
    // let [myAdress,setMyAdress] =useState(useSelector(st => st.order.adress)) ;
    // let myAdress = localStorage.getItem("adress");
    // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let myAdress = useSelector(state => state.order.adress);
    let currentUser = useSelector(state => state.user.currentUser);
    let cntProduct = basket.length;
    let sumForPayment = 0;
    basket.map(item => sumForPayment += item.cost * item.amount);

    const adresssPrompt = () => {
        disp(enterAdress(prompt("רשום כתובת מדויקת למשלוח", myAdress)));
        
    }
    
    const saveOrder = async () => {
        let products = basket.map((item) => {
            let minimalProduct = {
                "productName": item.productName,
                "amount": item.amount,
                "cost": item.cost,
                "_id": item._id
            }
            return minimalProduct;
        });
        let order = {
            "adress": myAdress,
            "products": products,
            "idUser": currentUser._id
        }
        try {
            saveOrderInServer(order, currentUser.token);
            alert("הזמנתך נשלחה בהצלחה")
        }
        catch (err) {
            console.log(err);
        }
    }
    

    return (<div
        // style={{
        //   position: "fixed",
        //   top: 0,
        //   width: "100vw",
        //   // "margin-left":"50vw",
        //   height: "100vh",
        //   backgroundColor: "yellow",
        // }}
      >
    
        <p>כמות מוצרים שהוזמנה:{cntProduct}</p>
        <br/>
        <p> סה"כ מחיר להזמנה זו :{sumForPayment}</p>
        <ul>
            {basket.map(item=> <li key={item._id}> <ProductInBasket product={item}/></li>)}
        </ul>
        <Link to={"/loveFlower/list"} >חזרה לדף המוצרים</Link>
        {/* <a href="/loveFlower/list">חזרה לדף המוצרים</a> */}
        <input type="Button" value="הכנס כתובת"
            onClick={adresssPrompt}></input>
        
        {<input type="Button" value="שמור הזמנה" onClick={saveOrder}/>}
        
    </div>);
}

 
export default Basket;