import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate,Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {display} from "../../redux/action"
import "../css/customNavbar.css"
function CustomNavbarBeforeLogin() {
  
    const dispatch=useDispatch();
    
    const navigate=useNavigate()

    
  return (
    <div className="CustomNavbar">
     
     
      <Navbar bg="primary" variant="dark">
        <Container>
        
          <Nav className="me-auto">
        
            <Nav.Link onClick={()=>navigate("/singup")}>Singup</Nav.Link>
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