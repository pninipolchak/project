import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    basket: [],
    adress: null//{}
}

let orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearStateandStorge: (state, action)=>{
            state.basket = [];
            state.adress = null;
            localStorage.clear();
    },
        updateBasketFromStorge: (state, action)=>{
            state.basket = action.payload;  
        },
        //הוספה לסל 
        addToBasket: (state, action) => {
            let product = action.payload;
            let index = state.basket.findIndex((item) => item._id == product._id)
            if (index == -1) {
                product.amount = 1;
                state.basket.push(product);
            } 
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        // מחיקה     
        deleteFromBasket:(state, action) => {   //send action=_id
            let idForDel = action.payload;
            let index =state.basket.findIndex((item) => item._id == idForDel)
            state.basket.splice(index, 1);
            alert(`המוצר נמחק`);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        //הוספה
        increseAmountInProduct: (state, action) => {
            let product = action.payload;
            let index = state.basket.findIndex((item) => item._id == product._id)
            state.basket[index].amount++;
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        //הפחתה
        decreseAmountInProduct: (state, action) => {
            let product = action.payload;
            if (product.amount > 1) {
                let index = state.basket.findIndex((item) => item._id == product._id)
                state.basket[index].amount--;
                localStorage.setItem("basket", JSON.stringify(state.basket));
                return;
            }
            let idForDel = product._id;
            let index =state.basket.findIndex((item) => item._id == idForDel)
            state.basket.splice(index,1);
            alert(`המוצר ${product.productName} נמחק`);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        //החזרת הכמות של פרח מסום
        // getAmountInProduct: (state, action) => {
        //     if (state.basket!=[]) {
        //         let product = action.payload;
        //         let index = state.basket.findIndex((item) => item._id == product._id)
        //         if (index != -1)
        //             return state.basket[index].amount;
        //     }
        //     return 0;
        // }

        //הכנסת כתובת
        enterAdress: (state, action) => {
            state.adress = action.payload;
            localStorage.setItem("adress", state.adress);
        }
    }
})

export const { clearStateandStorge,addToBasket ,deleteFromBasket,increseAmountInProduct,decreseAmountInProduct,getAmountInProduct,enterAdress,updateBasketFromStorge} = orderSlice.actions;
export default orderSlice.reducer;