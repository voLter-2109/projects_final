import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ButtonComicsListjsjs = (props) => {
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    props.onRequest(props.offset);
  }, [inView]);

  return (
    <button
      ref={ref}
      disabled={props.newItemLoading}
      style={{ display: props.comicsEnded ? "none" : "block" }}
      className="button button-main button-long"
      onClick={() => props.onRequest(props.offset)}
    >
      <div className="inner">{props.loading ? "loading..." : "load more"}</div>
    </button>
  );
};
