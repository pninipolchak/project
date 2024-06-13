import React,{ useState ,useEffect} from 'react';
import {getProduct} from './productApi.js'
import OneProduct from './OneProduct.js';
import { Link, Outlet } from 'react-router-dom';
import { DataView} from 'primereact/dataview';
// import { deleteProduct } from "./productApi";
// import { useSelector } from 'react-redux';

const ProductList = () => {

    let [arrProduct, setArrProduct] = useState([
        // {"productName":"aaa","cost":18,"urlImg":'.../public/images/f1'},
        // {"productName":"bbb","cost":18,"urlImg":".../public/images/f1'"}
    ]);
    
    let [currentPage, setCurrentPage] = useState(1);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProduct(currentPage,5)
            .then(res => {
                setIsLoading(true);
                setArrProduct([...arrProduct,...res.data])
            })
            .catch(err => { console.log(err) })
        .finally(()=>{setIsLoading(false)})
    }, [currentPage])
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= documentHeight - 100) {
          setCurrentPage(currentPage + 1);
        }
      };
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [currentPage]);


    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product,index) => {
            return <OneProduct product={product} index={index} />
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
    
    return (<div className="card">
        {/* <Link to={"/loveFlower/basket"} >לסל</Link> */}
        
        {isLoading && <h1>is Loading...</h1>}
        {/* <ul>
            {arrProduct.map(item =>
                <li key={item._id}>
                    <OneProduct product={item} /></li>
            )}
        </ul> */}

     <DataView value={arrProduct} listTemplate={listTemplate} />   
        <Outlet/>
    </div> );
}
 
export default ProductList;