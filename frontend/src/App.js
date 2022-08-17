import axios from "axios";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AfterLoginRouter from "./compoment/router/afterLoginRouter";
import BeforeLoginRouter from "./compoment/router/beforeLoginRouter";
import CustomNavbarAfterLogin from "./customCompoment/js/customNavbarAfterLogin";
import CustomNavbarBeforeLogin from "./customCompoment/js/customNavbarBeforeLogin";
import { useDispatch, useSelector } from "react-redux";
import { notification, urlFliper } from "./redux/action";
import CustomAlert from "./customCompoment/js/customAlert";
import { animation } from "./customCompoment/animation/animation.js";
import "./compoment/css/app.css";
function App() {
  console.log(window.location.origin.substring(7, 15));

  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const anim = useRef(null);
  const { errorNot, status, errorGroup } = useSelector((state) => state);

  console.log(useSelector((state) => state));

  const getUrl = async () => {
    dispatch(urlFliper());
  };

  useEffect(() => {
    getUrl(dispatch);
  }, []);

    useLayoutEffect(() => {
      animation(anim);
    }, [errorNot, errorGroup]);
  
  
  
 
  console.log(localStorage);
  return (
    <div className="App">
      {localStorage.getItem("webtoken") == undefined ? (
        <>
          <div ref={anim} className="anim">
            <CustomAlert />
          </div>{" "}
          <CustomNavbarBeforeLogin />
          <BeforeLoginRouter />
        </>
      ) : (
        <>
          {" "}
          <div ref={anim} className="anim">
            <CustomAlert />
          </div>{" "}
          <CustomNavbarAfterLogin />
          <AfterLoginRouter />
        </>
      )}
    </div>
  );
}

export default App;
