import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
import { NavLink } from "react-router-dom";
import {
  Button,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import styled from "styled-components";
const Container = styled.div``;
const MapHold = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 870px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;
const EmptyBooksContainer = styled.div`
  width: 100%;
`;

const Library = () => {
  const [booksInfo, setBooksInfo] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");
  //
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterName, setFilterName] = useState(null);
  //
  const [booksResults, setBooksResults] = useState([]);

  const getBooks = () => {
    let tempBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          tempBooksArr.push(book);
        });
      })
      .then(() => {
        if (tempBooksArr.length > 0) {
          setBooksInfo(tempBooksArr);
          setBooksResults(tempBooksArr);
        } else {
          setBooksInfo(null);
          setBooksResults(null);
        }
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  // filter
  const toggleFilterDropdown = () => {
    filterDropdown ? setFilterDropdown(false) : setFilterDropdown(true);
  };
  const handleFilterName = filterInput => {
    if (filterInput === null) {
      setFilterName(null);
      setBooksResults([...booksInfo]);
    }
    setFilterName(filterInput);
  };
  const filterSearch = e => {
    let books = [...booksInfo];
    if (filterName === null) {
      setBooksResults([...booksInfo]);
    } else if (filterName === "authors") {
      books = books.filter(book => {
        if (
          book[filterName]
            .join(",")
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return book;
        }
      });
      setBooksResults(books);
    } else if (filterName === "isbn") {
      books = books.filter(book => {
        if (
          book[filterName].toString().includes(e.target.value) ||
          book[`${filterName}13`].toString().includes(e.target.value)
        ) {
          return book;
        }
      });
      setBooksResults(books);
    } else {
      books = books.filter(book => {
        if (
          book[filterName].toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return book;
        }
      });
      setBooksResults(books);
    }
  };

  return (
    <Container>
      {booksInfo === null ? (
        <EmptyBooksContainer>
          <h6>You currently have no books in your library...</h6>
          <h6>Get started by searching through an option of 3 APIs</h6>
          <h6>Including Google Books, Goodreads, and Open Library</h6>
          <h6>If you still can't find what you are looking for</h6>
          <h6>Add a book manually to your library</h6>
          <NavLink to="/shelf/add">
            <Button>Add a book</Button>
          </NavLink>
        </EmptyBooksContainer>
      ) : (
        <div>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={filterDropdown}
              toggle={toggleFilterDropdown}
            >
              <DropdownToggle caret>
                Filter Library {filterName ? `by ${filterName}` : ""}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleFilterName("title")}>
                  Title
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterName("authors")}>
                  Author
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterName("language")}>
                  Language
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterName("description")}>
                  Description
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterName("isbn")}>
                  Isbn
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => handleFilterName(null)}>
                  No filter
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input onChange={filterSearch} />
          </InputGroup>
          <MapHold>
            {booksResults.map(book => (
              <Book
                key={Math.random()}
                book={book}
                getBooks={getBooks}
                userUid={user.uid}
              />
            ))}
          </MapHold>
        </div>
      )}
    </Container>
  );
};

export default Library;
