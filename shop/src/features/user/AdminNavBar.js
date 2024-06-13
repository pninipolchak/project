
import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userOut } from './userSlice';
import { clearStateandStorge } from '../order/orderSlice';

const AdminNavBar=({name}) =>{

    let disp = useDispatch();
    const startContent = (
        <></>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-8">
            <Link to={"/loveFlower/list"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-user text-2xl"></i> */}
                <label>המוצרים שלנו</label>
            </button></Link>
            <Link to={"/loveFlower/admin/add"}><button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-user text-2xl"></i> */}
                <label> הוספת מוצר</label>
            </button></Link>
            <button onClick={() => { disp(userOut()); disp(clearStateandStorge()) }} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {/* <i className="pi pi-search text-2xl"></i> */}
                <label>התנתקות</label>
            </button>
        </div>
    );


    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-bluegray-50">{ name}</span>
            </div>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    );
}

export default AdminNavBar;
        