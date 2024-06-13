import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./productApi";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";



const AddProduct = () => {
  let currentUser = useSelector(st => st.user.currentUser);
  //   let disp = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const add = async (data) => {
    try {
      let res = await addProduct(data, currentUser.token);
      if (res.status == 200) { alert("המוצר נוסף בהצלחה"); }
    } catch (err) {
      alert(err.message + " התרחשה שגיאה נסה שוב");
    }
  };

  return (
    <form onSubmit={handleSubmit(add)}>

      <h1 style={{ fontFamily: "monospace" }}>הוסף מוצר</h1>

      <div className="card flex justify-content-center">
        <div className="flex flex-column gap-1">
          <label htmlFor="productName">שם המוצר</label>
          <InputText id="productName" aria-describedby="productName-help"
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
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim" 
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

export default AddProduct;
