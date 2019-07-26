import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const NavMenuDiv = styled.div`
  display: grid;
  align-items: end;
  margin: 0px 8px;

  @media (max-width: 800px) {
    justify-content: end;
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
          <DropdownToggle caret>Menu</DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf">
              <DropdownItem>Shelf</DropdownItem>
            </NavLink>
            <DropdownItem divider />
            <NavLink to="/shelf/borrowed">
              <DropdownItem>Borrowed</DropdownItem>
            </NavLink>
            <NavLink to="/shelf/loaned">
              <DropdownItem>Loaned</DropdownItem>
            </NavLink>
            <NavLink to="/shelf/library">
              <DropdownItem>Library</DropdownItem>
            </NavLink>
            <NavLink to="/shelf/add">
              <DropdownItem>Add A Book</DropdownItem>
            </NavLink>
            <NavLink to="/shelf/map">
              <DropdownItem>Map</DropdownItem>
            </NavLink>
            <NavLink to="/shelf/search">
              <DropdownItem>Search</DropdownItem>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </NavMenuDiv>
    );
  }
}
