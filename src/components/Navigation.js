import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
  } from 'reactstrap';
  import {Link} from '@reach/router';
  import './createtask.css'

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
       
    }
    render() {
        return (
            <div>
              <Navbar color="primary" light expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand  href="/">Navbar</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                   <Link to='/' className="links"> Create Task</Link>
                                </NavItem>
                            
                                <NavItem>
                                   <Link to ='/scoretask' className="links"> Score Task</Link> 
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
              </Navbar>
                
            </div>
        );
    }
}

export default Navigation;