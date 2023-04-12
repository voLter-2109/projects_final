import React from "react";
import ContentLoader from "react-content-loader";

const SceletonProduct: React.FC = () => (
  <ContentLoader
    className="product-block"
    speed={2}
    width={288}
    height={466}
    viewBox="0 0 288 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="114" r="115" />
    <rect x="1" y="238" rx="10" ry="10" width="280" height="27" />
    <rect x="3" y="273" rx="10" ry="10" width="280" height="80" />
    <rect x="105" y="361" rx="10" ry="10" width="173" height="45" />
    <rect x="3" y="361" rx="10" ry="10" width="91" height="45" />
  </ContentLoader>
);

export default SceletonProduct;
