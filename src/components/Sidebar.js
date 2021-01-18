import React, { useState } from 'react';
import styled from "styled-components";
import { NavItem } from './NavItem'
const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */
  top: 3.4em;      /* Stay at the top */
  background-color: #222; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;

function SideNav(params) {
    const [activePath, setActivePath] = useState('/');
    const [items, setItems] = useState([
        {
            path: '/', /* path is used as id to check which NavItem is active basically */
            name: 'Bubble',
            css: 'fa fa-fw fa-home',
            key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
        },
        {
            path: '/count',
            name: 'Count',
            css: 'fa fa-fw fa-clock',
            key: 2
        },
        {
            path: '/merge',
            name: 'Merge',
            css: 'fas fa-hashtag',
            key: 3
        },
    ]);
    function onItemClick(path) {
        setActivePath(path);/* Sets activePath which causes rerender which causes CSS to change */
    }
    return (
        <StyledSideNav>
            {
                /* items = just array AND map() loops thru that array AND item is param of that loop */
                items.map((item) => {
                    /* Return however many NavItems in array to be rendered */
                    return (
                        <NavItem path={item.path} name={item.name} css={item.css} onItemClick={() => onItemClick(item.path)} /* Simply passed an entire function to onClick prop */ active={item.path === activePath} key={item.key} />
                    )
                })
            }
        </StyledSideNav>
    )
}

export function Sidebar() {

    return (
        <SideNav></SideNav>
    );

}