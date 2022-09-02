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
import {animated, useSpring} from "react-spring"
import "./compoment/css/app.css";


import QRCode from 'qrcode'
function App() {
  console.log(window.location.origin.substring(7, 15));
  const [qrCodeAnimation,setQrCodeAnimation]=useSpring(()=>({}))

  const [qrCode,setQrCode]=useState("")
  const navigate=useNavigate()
  const [number,setNumber]=useState(0)
  const [data, setData] = useState([]);
  const generateQR = async text => {
    try {
      setQrCode(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }
  const qrCodeAnimationFliperBeforeLogin=()=>{
    setNumber(number+1)
    console.log(number)
    if (number%2!=0){
      setQrCodeAnimation.start(()=>({to:{x:-10,y:10,scale:1}}))
    }else{
      setQrCodeAnimation.start(()=>({to:{x:-40,y:-40,scale:3}}))
    }
   
  }
  const qrCodeAnimationFliperAfterLogin=()=>{
    setNumber(number+1)
    console.log(number)
    if (number%2!=0){
      setQrCodeAnimation.start(()=>({to:{x:-10,y:10,scale:1}}))
    }else{
      setQrCodeAnimation.start(()=>({to:{x:40,y:-40,scale:3}}))
    }
   
  }
  useEffect(()=>{
    console.log(window.location)
    generateQR(window.location.href)
  },[window.location.href])
  
  const dispatch = useDispatch();
  const anim = useRef(null);
  const { errorNot, status, errorGroup } = useSelector((state) => state);
 const [spring, setSpring] = useSpring(() => ({
      loop: false,
      x: 0,
      y: -100,
      opacity: 1
    }));
  
  console.log(useSelector((state) => state));

  const getUrl = async () => {
    dispatch(urlFliper());
  };

  useEffect(() => {
    getUrl(dispatch);
  }, []);

    useEffect(() => {
     
   
      console.log(window.matchMedia("(max-width:1024px)").matches);
      if (window.matchMedia("(max-width:320px)").matches == true) {
       setSpring.start(() => ({
            from: { x: 660, y: -100 },
            to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
            config: { duration: 10000 }
          }));
      } else {
        if (window.matchMedia("(max-width:375px)").matches == true) {
          setSpring.start(() => ({
            from: { x: 660, y: -100 },
            to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
            config: { duration: 10000 }
          }));
        } else {
          if (window.matchMedia("(max-width:425px)").matches == true) {
            setSpring.start(() => ({
              from: { x: 660, y: -100 },
              to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
              config: { duration: 10000 }
            }));
          } else {
            if (window.matchMedia("(max-width:768px)").matches == true) {
              setSpring.start(() => ({
                from: { x: 660, y: -100 },
                to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
                config: { duration: 10000 }
              }));
            } else {
              if (window.matchMedia("(max-width:1024px)").matches == true) {
                setSpring.start(() => ({
                  from: { x: 660, y: -100,opacity:1 },
                  to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
                  config: { duration: 10000 }
                }));
              } else {
                if (window.matchMedia("(max-width:1440px)").matches == true) {
                  setSpring.start(() => ({
                    from: { x: 660, y:-100,opacity:1 },
                    to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
                    config: { duration: 10000 }
                  }));
                } else {
                  if (window.matchMedia("(max-width:2560px)").matches == true) {
                    setSpring.start(() => ({
                      from: { x: 660, y: -100 },
                      to: [{ x: 35}, { opacity: 0 }, { x: 600 }],
                      config: { duration: 10000 }
                    }));
                  }
                }
              }
            }
          }
        }
      }
     
  
    }, [errorNot, errorGroup]);
  
  
  
 
  console.log(localStorage);
  return (
    <div className="App">
      {localStorage.getItem("webtoken") == undefined ? (
        <>
          <div style={spring} className="anim">
            <CustomAlert spring={spring} />
          </div>{" "}
          <CustomNavbarBeforeLogin />
          <BeforeLoginRouter />
          <animated.img className="qr_code_before_login" src={qrCode}  style={qrCodeAnimation} onClick={()=>{qrCodeAnimationFliperBeforeLogin()}}/>
        </>
      ) : (
        <>
          {" "}
          <div className="anim">
           
            <CustomAlert spring={spring} />
          </div>{" "}
          <CustomNavbarAfterLogin />
          <AfterLoginRouter />
         <animated.img className="qr_code_after_login" src={qrCode} style={qrCodeAnimation} onClick={()=>{qrCodeAnimationFliperAfterLogin()}}
          
         />
        </>
      )}
    </div>
  );
}

export default App;
