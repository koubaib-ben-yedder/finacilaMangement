import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"

import "../css/customNavbar.css"
 
function CustomNavbarBeforeLogin() {
  
 
    
    const navigate=useNavigate()

    
  return (
    <div className="CustomNavbar">
     
     
      <Navbar bg="primary" variant="dark">
        <Container>
        
          <Nav className="me-auto">
            
          <img className="customNavbar-icon" src="/favicon.ico" type="image/x-icon"></img>

            <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/singup")}>Sing up</Nav.Link>
            <Nav.Link onClick={()=>navigate("/login")}>Login</Nav.Link>
       
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

export default CustomNavbarBeforeLogin;