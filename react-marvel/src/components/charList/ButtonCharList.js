import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ButtonCharListjsjs = (props) => {
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    props.onRequest(props.offset);
  }, [inView]);

  return (
    <button
      ref={ref}
      className="button button-main button-long"
      disabled={props.newItemLoading}
      style={{ display: props.charEnded ? "none" : "block" }}
      onClick={() => props.onRequest(props.offset)}
    >
      <div className="inner">{props.loading ? "loading..." : "load more"}</div>
    </button>
  );
};

export default ButtonCharListjsjs;
