import { useNavigate } from "react-router-dom";
import AfterLoginRouter from "./compoment/router/afterLoginRouter"
import BeforeLoginRouter from "./compoment/router/beforeLoginRouter";
import CustomNavbarAfterLogin from "./customCompoment/js/customNavbarAfterLogin";
import CustomNavbarBeforeLogin from "./customCompoment/js/customNavbarBeforeLogin";
function App() {
  
  

  console.log(localStorage.length)
  
  const navigate=useNavigate()
  console.log(localStorage)
  return (
    <div className="App">
 
    {localStorage.length==0?<> <CustomNavbarBeforeLogin/><BeforeLoginRouter/></>:<> <CustomNavbarAfterLogin/><AfterLoginRouter/></>}

    </div>
  );
}

export default App;
