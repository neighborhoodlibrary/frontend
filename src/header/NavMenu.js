// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from "reactstrap";

// const NavMenuDiv = styled.div`
//   display: grid;
//   align-items: end;
//   margin: 0px 8px;

//   @media (max-width: 800px) {
//     justify-content: end;
//   }
// `;

// export default class NavMenu extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false
//     };
//   }

//   toggle() {
//     this.setState(prevState => ({
//       dropdownOpen: !prevState.dropdownOpen
//     }));
//   }

//   render() {
//     return (
//       <NavMenuDiv>
//         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//           <DropdownToggle caret>Menu</DropdownToggle>
//           <DropdownMenu>
//             <NavLink to="/shelf">
//               <DropdownItem>Shelf</DropdownItem>
//             </NavLink>
//             <DropdownItem divider />
//             <NavLink to="/shelf/borrowed">
//               <DropdownItem>Borrowed</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/loaned">
//               <DropdownItem>Loaned</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/library">
//               <DropdownItem>Library</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/add">
//               <DropdownItem>Add A Book</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/map">
//               <DropdownItem>Map</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/search">
//               <DropdownItem>Search</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/requested">
//               <DropdownItem>Requested</DropdownItem>
//             </NavLink>
//             <NavLink to="/shelf/receiving">
//               <DropdownItem>Receiving</DropdownItem>
//             </NavLink>
//           </DropdownMenu>
//         </Dropdown>
//       </NavMenuDiv>
//     );
//   }
// }

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
  align-items: end;
  margin: 0px 8px;

  @media (max-width: 800px) {
    justify-content: end;
  }
`;
const DropdownDiv = styled.div`
  margin: 0px 8px;
`;

const NavMenu = () => {
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
          <DropdownToggle caret>Shelf</DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf">
              <DropdownItem id="shelfTooltip">Shelf</DropdownItem>
              <UncontrolledTooltip placement="auto" target="shelfTooltip">
                All books
              </UncontrolledTooltip>
            </NavLink>
            <DropdownItem divider />
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
          <DropdownToggle caret>Lookup</DropdownToggle>
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
          <DropdownToggle caret>Transactions</DropdownToggle>
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
          <DropdownToggle caret>Settings</DropdownToggle>
          <DropdownMenu>
            <NavLink to="/shelf/map">
              <DropdownItem id="mapTooltip">Map</DropdownItem>
              <UncontrolledTooltip placement="auto" target="mapTooltip">
                Assign the location of your personal library
              </UncontrolledTooltip>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </DropdownDiv>
    </NavMenuDiv>
  );
};

export default NavMenu;
