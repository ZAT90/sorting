import React, { useState } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import Switch from "react-switch";
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export function NavigationBar({showConsole}) {
  const [checked, setChecked] = useState(false);

  // const handleChange =()=> {
  //   setChecked(!checked);
  // }
  function handleChange() {
    setChecked(!checked);
    console.log('checked: '+checked);
    showConsole(!checked);
  }
  return (
    <Styles>
      <Navbar className="mr-auto" expand="lg">
        {/* <Navbar.Brand href="/">Tutorial</Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/> */}
        <label>
          <span style={{ color: 'white', marginRight: 20 }}>{checked ? 'Turn off console' : 'Turn on console'}</span>
          <Switch
            onChange={() => handleChange()}
            checked={checked} />
        </label>
        {/* <Form className="form-center">
         
        </Form> */}
        {/* <Navbar.Brand id="basic-navbar-nav">
         
        </Navbar.Brand> */}
      </Navbar>
    </Styles>
  )

}
// export const NavigationBar = () => (

// )