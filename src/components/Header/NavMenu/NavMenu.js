import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SignInButton from "../../SignIn/SignInButton";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const NavMenuDiv = styled.div`
  display: flex;
  align-items: center;

  a {
    // margin: 0px 5px;
    // background-color: #f0efed;
    // color: #1a1919;
    // font-size: 0.95em;
    // padding: 6px 11px;
    // border-radius: 2px;
    // text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
  }

  @media(max-width: 800px){
    justify-content: space-between;
  }
`;

export default class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <NavMenuDiv>
  
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Menu
        </DropdownToggle>
        <DropdownMenu>
          <NavLink to="/shelf"><DropdownItem>Shelf</DropdownItem></NavLink>
          <DropdownItem divider />
          <NavLink to="/shelf/borrowed"><DropdownItem>Borrowed</DropdownItem></NavLink>
          <NavLink to="/shelf/loaned"><DropdownItem>Loaned</DropdownItem></NavLink>
          <NavLink to="/shelf/library"><DropdownItem>Library</DropdownItem></NavLink>
          <NavLink to="/shelf/add"><DropdownItem>Add A Book</DropdownItem></NavLink>
        </DropdownMenu>
      </Dropdown>
      <SignInButton />
      </NavMenuDiv>
    );
  }
}
