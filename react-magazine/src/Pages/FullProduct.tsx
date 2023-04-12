import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullProduct: React.FC = () => {
  const [product, setProduct] = useState<{
    imageUrl: string[];
    name: string;
    price: number;
    category: number;
    id: string;
    rating: number;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://642582899e0a30d92b34169f.mockapi.io/items/${id}`
        );
        setProduct(data);
        console.log(data);
      } catch (error) {
        alert("Error");
        navigate("/");
      }
    }

    fetchProduct();
  }, [navigate, id]);

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      <div className="fullproduct">
        <div className="fullproduct__left">
          {product.imageUrl.map((imgUrl, i) => {
            return (
              <img
                key={i}
                src={imgUrl}
                alt="product"
                style={{ width: "250px" }}
              />
            );
          })}
        </div>
        <div className="fullproduct__right">
          <h3> {product.name}</h3>
          <h4>Price: {product.price.toLocaleString("ru")} ₩</h4>
          <div style={{ width: "350px" }}>
            <b>Information:</b> <br />
            
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
              quiaut. Doloremque voluptas, deleniti assumenda dolore laboriosam
              atqui magnam repudiandae nostrum corrupti eius nam corporis, ut
              in, quaerat enim?
           
          </div>
          <Link
            to="/"
            className="button button--black"
            style={{ width: "230px" }}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullProduct;
