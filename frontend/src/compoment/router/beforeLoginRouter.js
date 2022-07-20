import react from "react"
import {useRoutes} from "react-router-dom"

import SingUp from "../js/singUp"
import Login from "../js/login"
import Main from "../js/mainPage"

const BeforeLoginRouter=()=>{

    const Route=useRoutes([
        {path:"/login",exact:true,element:<Login/>},
        {path:"/singup",element:<SingUp/>},
       
        {path:"/",exact:true,element:<Main/>},

    ])
    /*
    return(<div>
        <Routes>
            <Route path="/" exact="true" element={<Main/>}/>
            <Route path="/edit" elemen t={<Edit/>}/>
            <Route path="/factor" elemnt={<Factor/>}/>
            <Route path="/icnome" element={<Income />}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/who" element={<Who/>}/>
        </Routes>
    </div>)*/

return Route

    

}

export default BeforeLoginRouter