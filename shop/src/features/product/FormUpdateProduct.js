import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  getProductById, updateProduct } from "./productApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";



const UpdateProduct = () => {
  let currentUser = useSelector(st => st.user.currentUser);
  let [currentProduct, setCurrentProduct] = useState({});
  let { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setCurrentProduct(res.data);
        // console.log(res.data);
      })
      .catch(err => { console.log(err) })
  
  }, []);
  //   let disp = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });

    const update = async (data) => {
        try {
            let res = await updateProduct(id,data,currentUser.token);
            if(res.status==200){alert("המוצר עודכן בהצלחה");}
        } catch (err) {
            alert(err.message + " התרחשה שגיאה נסה שוב");
        }
    };

  return (
    <form onSubmit={handleSubmit(update)}>
      <h1 style={{ fontFamily: "monospace" }}>עדכן מוצר</h1>

<div className="card flex justify-content-center">
  <div className="flex flex-column gap-1">
    <label htmlFor="productName">שם המוצר</label>
          <InputText id="productName" aria-describedby="productName-help"
            defaultValue={currentProduct.productName}
      type="text" {...register("productName", {
        required: { value: true, message: "שדה חובה"}, min: 0, min: 10, max: 150 ,
      })} />
    {errors.productName && <small id="productName-help">{errors.productName.message}</small>}
  </div>
</div>

<div className="card flex justify-content-center">
  <div className="flex flex-column gap-1">
    <label htmlFor="cost">מחיר </label>
          <InputText id="cost" aria-describedby="cost-help"
                defaultValue={currentProduct.cost}
      type="number"
      {...register("cost", {
        required: { value: true, message:"שדה חובה"}, min: 0
      })} />
    {errors.cost && <small id="cost-help">{errors.cost.message}</small>}
  </div>
</div>

<div className="card flex justify-content-center">
  <div className="flex flex-column gap-1">
    <label htmlFor="description">תאור תמונה </label>
    <InputText id="description" aria-describedby="description-help"
      defaultValue={currentProduct.description}
      type="text" {...register("description", {
        required: { value: true, message: "שדה חובה"}, min: 0, min: 10, max: 150 ,
      })} />
    {errors.description && <small id="description-help">{errors.description.message}</small>}
  </div>
</div>

<div className="card flex justify-content-center">
  <div className="flex flex-column gap-1">
    <label htmlFor="urlImg">כתובת תמונה </label>
          <InputText id="urlImg" aria-describedby="urlImg-help"
                defaultValue={currentProduct.urlImg}
      type="text" {...register("urlImg", {
        required: { value: true, message: "שדה חובה"}, min: 0, min: 10, max: 150 ,
      })} />
    {errors.urlImg && <small id="urlImg-help">{errors.urlImg.message}</small>}
  </div>
</div>

<div className="card flex justify-content-center">
<Button icon="pi pi-check" className="p-button-rounded"/>
</div>
    </form>
  );
};

export default UpdateProduct;
