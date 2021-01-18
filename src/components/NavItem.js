import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
const NavIcon = styled.div`
`;
const StyledNavItem = styled.div`
  height: 70px;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    
    color: ${({active}) => active ? "white" : "#9FFFCB"};
    :hover {
      opacity: 0.7;
      text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`;
//color:"white";
//color: ${(props) => props.active ? "white" : "#9FFFCB"};
export function NavItem({path,name,css,onItemClick,active}) {
  function handleClick (path) {
   // const { path, onItemClick } = this.props;
    onItemClick(path);
  }

  return (
    <StyledNavItem active={active}>
    <Link to={path} className={css} onClick={()=>handleClick(path)}>
      <NavIcon></NavIcon>
    </Link>
  </StyledNavItem>
  );

}
// export default class NavItem extends React.Component {
    
//   }