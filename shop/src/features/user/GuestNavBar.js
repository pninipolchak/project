import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userOut } from './userSlice';


const GuestNavBar = () => {

    let disp = useDispatch();
    const startContent = (
        <></>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-8">
            <Link to={"/loveFlower/register"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-shoping-cart"></i> */}
                <label>הרשמה</label>
            </button></Link>
            <Link to={"/loveFlower/login"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-user text-2xl"></i> */}
                <label> התחברות</label>
            </button></Link>
            <Link to={"/loveFlower/list"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-user text-2xl"></i> */}
                <label>המוצרים שלנו</label>
            </button></Link>
            <Link to={"/loveFlower/basket"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-user text-2xl"></i> */}
                <label> לסל הקניות שלך</label>
            </button></Link>

        </div>
    );

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-bluegray-50">אורח</span>
            </div>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    );
}




export default GuestNavBar;