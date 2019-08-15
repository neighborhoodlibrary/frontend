import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";

const NavMenuDiv = styled.div`
  display: flex
  justify-content: end;
  margin: 0px 8px;

  @media(max-width: 500px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;
const DropdownDiv = styled.div`
  margin: 0px 5px;

  @media (max-width: 500px) {
    margin: 5px 0px;
  }
`;

const NavMenu = props => {
  const [dropdownShelf, setDropdownShelf] = useState(false);
  const [dropdownLookup, setDropdownLookup] = useState(false);
  const [dropdownTransaction, setDropdownTransaction] = useState(false);
  const [dropdownSettings, setDropdownSettings] = useState(false);

  const toggleDropdownShelf = () => {
    dropdownShelf ? setDropdownShelf(false) : setDropdownShelf(true);
  };
  const toggleDropdownLookup = () => {
    dropdownLookup ? setDropdownLookup(false) : setDropdownLookup(true);
  };
  const toggleDropdownTransaction = () => {
    dropdownTransaction
      ? setDropdownTransaction(false)
      : setDropdownTransaction(true);
  };
  const toggleDropdownSettings = () => {
    dropdownSettings ? setDropdownSettings(false) : setDropdownSettings(true);
  };

  return (
    <NavMenuDiv>
      <DropdownDiv>
        <Dropdown isOpen={dropdownShelf} toggle={toggleDropdownShelf}>
          <DropdownToggle caret color="success">
            Shelf
          </DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf/library">
              <DropdownItem id="libraryTooltip">Library</DropdownItem>
              <UncontrolledTooltip placement="auto" target="libraryTooltip">
                Books you personally own
              </UncontrolledTooltip>
            </NavLink>
            <NavLink to="/shelf/loaned">
              <DropdownItem id="loanedTooltip">Loaned</DropdownItem>
              <UncontrolledTooltip placement="auto" target="loanedTooltip">
                Books you have loaned
              </UncontrolledTooltip>
            </NavLink>
            <NavLink to="/shelf/borrowed">
              <DropdownItem id="borrowedTooltip">Borrowed</DropdownItem>
              <UncontrolledTooltip placement="auto" target="borrowedTooltip">
                Books you have borrowed
              </UncontrolledTooltip>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown isOpen={dropdownLookup} toggle={toggleDropdownLookup}>
          <DropdownToggle caret color="success">
            Lookup
          </DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf/add">
              <DropdownItem id="addTooltip">Add A Book</DropdownItem>
              <UncontrolledTooltip placement="auto" target="addTooltip">
                Add a book to your personal library
              </UncontrolledTooltip>
            </NavLink>
            <NavLink to="/shelf/search">
              <DropdownItem id="searchTooltip">
                Search other Libraries
              </DropdownItem>
              <UncontrolledTooltip placement="auto" target="searchTooltip">
                Search other personal libraries to request to borrow
              </UncontrolledTooltip>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          isOpen={dropdownTransaction}
          toggle={toggleDropdownTransaction}
        >
          <DropdownToggle caret color="success">
            Transactions
          </DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf/requested">
              <DropdownItem id="requestedTooltip">Requested</DropdownItem>
              <UncontrolledTooltip placement="auto" target="requestedTooltip">
                Books you have requested to borrow
              </UncontrolledTooltip>
            </NavLink>
            <NavLink to="/shelf/receiving">
              <DropdownItem id="receivingTooltip">Receiving</DropdownItem>
              <UncontrolledTooltip placement="auto" target="receivingTooltip">
                Books you are about to receive, confirm to borrow
              </UncontrolledTooltip>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown isOpen={dropdownSettings} toggle={toggleDropdownSettings}>
          <DropdownToggle caret color="success">
            Settings
          </DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf/map">
              <DropdownItem id="mapTooltip">Map</DropdownItem>
              <UncontrolledTooltip placement="auto" target="mapTooltip">
                Assign the location of your personal library
              </UncontrolledTooltip>
            </NavLink>
            <NavLink to="/shelf/profile">
              <DropdownItem id="profileTooltip">Profile</DropdownItem>
              <UncontrolledTooltip placement="auto" target="profileTooltip">
                View or (eventually) edit your Neighborhood Library profile.
              </UncontrolledTooltip>
            </NavLink>
            <DropdownItem onClick={props.signOut}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DropdownDiv>
    </NavMenuDiv>
  );
};

export default NavMenu;
