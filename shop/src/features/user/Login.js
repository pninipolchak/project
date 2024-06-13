import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login_getNewToken } from "./userApi";
import { userIn } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";

const Login = () => {

  let disp = useDispatch();
  const navigate = useNavigate();
  let [cntTryLogin, setCntTryLogin] = useState(0);
  
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const signIn = async (data) => {
    try {
      let res = await login_getNewToken(data);
      alert("התחברת בהצלחה");
      disp(userIn(res.data));
      navigate("/loveFlower/list");

    } catch (err) {
      alert(err + "  נסה שוב התרחשה שגיאה");
      setCntTryLogin(cntTryLogin + 1);
      if (cntTryLogin == 2) {
        navigate("/loveFlower/register");
      }
    }

  };

  


  return (
    <form onSubmit={handleSubmit(signIn)}>

      <h1 style={{fontFamily:"monospace"}}>login now..</h1>
      <div className="card flex justify-content-left">
        <div className="flex flex-column gap-2">
          <label htmlFor="email">מייל</label>
          <InputText id="email" aria-describedby="email-help"
            type="email"
            {...register("email", {
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

export default Login;




{/* <label> מייל</label> */ }
{/* <input type="email" {...register("email", {
        required: { value: true, message: "email is requires" },
        email:{value:true,message:"not valid email"},
      })} />
       */}
{/* <label>סיסמא</label> */ }
{/* <input
        type="password"
        {...register("password", {
          required: { value: true, message: "password is requires" },
          type: { String: true },
          password: { value: true },
          pattern: { pattern: /^[a-zA-Z0-9]{6}$/ }
        })}
      /> */}
{/* {errors.password && <span>{errors.password.message}</span>} */ }
{/* <Message severity="error" text={errors.password.message} /> */ }














