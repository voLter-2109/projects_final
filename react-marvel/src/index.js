import { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";
import Test from "./components/preloader/Test";
import "./style/style.scss";

// API developer.marvel.com

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
    };
  }

  componentDidMount() {
    const fetching = setTimeout(() => {
      this.setState({
        render: true,
      });
    }, 3000);
  }

  render() {
    const appRender = this.state.render ? <App /> : <Test />;
    return <>{appRender}</>;

  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Preloader />
  </BrowserRouter>
);
