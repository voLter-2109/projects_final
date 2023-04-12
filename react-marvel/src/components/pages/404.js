import { Link } from "react-router-dom";
import img from "./errorNotFound.png";

const Page404 = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img style={{ width: "200px" }} src={img} alt="" />
      <Link style={{ fontSize: "40px" }} to="/">
        Home
      </Link>
    </div>
  );
};

export default Page404;
