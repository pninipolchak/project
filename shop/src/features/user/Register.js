import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {  registerInServer } from "./userApi";
import { userIn } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";

const Register = () => {

  let disp = useDispatch();
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

    const signOn = async (data) => {
        try {
            let res = await registerInServer(data);
            alert("נרשמת בהצלחה");
          disp(userIn(res.data));
          navigate("/loveFlower/list")
        } catch (err) {
            alert(err +"\n"+ "התרחשה שגיאה בתהליך ההרשמה נסה שוב");
        }
    };

  return (<form onSubmit={handleSubmit(signOn)}>
    

    <h1 style={{ fontFamily: "monospace" }}>register now</h1>
    
    <div className="card flex justify-content-left">
        <div className="flex flex-column gap-2">
          <label htmlFor="userName">שם</label>
          <InputText id="userName" aria-describedby="userName-help"
             type="text" {...register("userName", {
              required: { value: true, message: "userName is required" },
                min: {value:1,message:"לפחות שתי אותיות"},
              max:{value:30,message:"אורך מקסימלי 30"},
            })} 
          />
          {errors.userName && <small id="userName-help">{errors.userName.message}</small>}
        </div>
      </div>
    

      <div className="card flex justify-content-left">
        <div className="flex flex-column gap-2">
          <label htmlFor="email">מייל</label>
          <InputText id="email" aria-describedby="email-help"
            type="email"
          {...register("email", {
            type: { String: true },
              required: { value: true, message: "email is required" },
              email: { value: true, message: "not valid email" },
            })} />
          {errors.email && <small id="email-help">{errors.email.message}</small>}
        </div>
      </div>

      <div className="card flex justify-content-left">
        <div className="flex flex-column gap-2">
          <label htmlFor="password">סיסמא</label>
          <InputText id="password" aria-describedby="password-help"
            type="password"
            {...register("password", {
              required: { value: true, message: "password is required" },
              type: { String: true },
              password: { value: true, message: "not valid password" },
              pattern: {
                value: /^[a-zA-Z0-9]{6}$/ ,
                message: "invalid password : [a - zA - Z0 - 9]{6}"
              }
              // pattern: 
            })}
          />
          {errors.password && <small id="password-help">{errors.password.message}</small>}
        </div>
      </div>

      
      <div className="card flex justify-content-left">
        <Button label="התחבר" />
      </div>
    
      
      
    </form>
  );
};

export default Register;
