import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    let imgurl = window.location.origin + '/images/' + "homePage" + ".webp"
    let navigate = useNavigate();

    return (<div style={{
        "width": "100%",
        "height": "100%",
        "border": "1px solid black",
        "textAlign": "center"
    }}>
        <img style={{ " display": "inline-block" }} src={imgurl} alt={"homePage"} />
        <div className="card flex justify-content-center ">
            <Button label="get start" style={{ "backgroundColor": "pink" }} onClick={() => navigate("/loveFlower/list")} />
        </div>
    </div>);
}

export default HomePage;