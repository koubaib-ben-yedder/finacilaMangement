import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {display} from "../../redux/action"
import "../css/customNavbar.css"
function CustomNavbarAfterLogin() {
  
    const dispatch=useDispatch();
    
    const navigate=useNavigate()

    
  return (
    <div className="CustomNavbar">
     
     
      <Navbar bg="primary" variant="dark">
        <Container>
       
          <Nav className="me-auto">
           <img className="customNavbar-icon" src="/favicon.ico" />

            <Nav.Link  onClick={()=>navigate("/")} >Dashbord</Nav.Link>
            <Nav.Link onClick={()=>navigate("/edit")} onDoubleClick={()=> dispatch(display({show:true,page:"Edit"}))}>Edit</Nav.Link>
            <Nav.Link onClick={()=>navigate("/factor")}>Factor</Nav.Link>
            <Nav.Link onClick={()=>navigate("/income")}>Income</Nav.Link>
            <Nav.Link onClick={()=>navigate("/user")}>User</Nav.Link>
            <Nav.Link onClick={()=>navigate("/client")}>Client</Nav.Link>
      
          
            {/* <Link to="/factor">Factor</Link>
            <Link to="/edit">Edit</Link>
            <Link to="/factor">Factor</Link>
            <Link to="/income">Income</Link>
            <Link to="/who" >Who</Link>
           */}
          </Nav>
        </Container>
      </Navbar>

    </div>
  );
}

export default CustomNavbarAfterLogin;