import react from "react"
import {useRoutes} from "react-router-dom"
import Main from "../js/mainPage"
import Edit from "../js/editPage"
import Factor from "../js/factorPage"
import Income from "../js/incomePage"
import User from "../js/userPage"
import Client from "../js/clientPage"
import SingUp from "../js/singUp"
const AfterLoginRouter=()=>{

    const Route=useRoutes([
        {path:"/",exact:true,element:<Main/>},
        {path:"/edit",element:<Edit/>},
        {path:"/factor",element:<Factor/>},
        {path:"/income",element:<Income/>},
        {path:"/user",element:<User/>},
        {path:"/client",element:<Client/>},
        {path:"/singup",element:<SingUp/>},
      

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

export default AfterLoginRouter