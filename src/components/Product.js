import vegetarian from "../assets/svg/vegetariano_adobe_express.svg";
import not_vegetarian from "../assets/svg/no-vegetarian_adobe_express.svg";
import "./Product.css"
import { Link } from "react-router-dom";

function Product(props) {

	return (
        <>
        <div className="product">
            <img
                src={props.product.image}
                alt="imagen-producto"
            />
            <div className="p-informacion">
                <Link className="custom-link" to={"/Products/"+props.product.id}><h3>{props.product.name}</h3></Link>
                
                <p>
                    Precio:{" "}
                    <span className="price">
                        ${props.product.price}
                    </span>
                </p>
                <img
                    className="vegetarian"
                    src={
                        props.product.is_vegetarian
                            ? vegetarian
                            : not_vegetarian
                    }
                    alt=""
                    height="20px"
                />
                <p>Valoraciones: {props.product.votaciones}</p>
            </div>
        </div>
    </>
	);
}

export default Product;
