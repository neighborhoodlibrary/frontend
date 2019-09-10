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
const Container = styled.div`
  background-color: rgb(127, 173, 80);
  border-radius: 2px;
  padding: 15px;
  box-sizing: border-box;
`;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: rgba(255,255,255,.1);
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 2px;
  color: white;
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
  const [sortDropdown, setSortDropdown] = useState(false);
  const [sortDirection, setSortDirection] = useState({
    authors: "",
    isbn: "",
    isbn13: "",
    title: ""
  });
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
      setSortDirection({ authors: "", isbn: "", isbn13: "", title: "" });
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
  // sort
  const toggleSortDropdown = () => {
    sortDropdown ? setSortDropdown(false) : setSortDropdown(true);
  };
  const toggleSortTitle = () => {
    let books = [...booksResults];
    if (!sortDirection.title || sortDirection.title === "▲") {
      books = books.sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, title: "▼" });
    } else {
      books = books.sort((a, b) => {
        return a.title.toLowerCase() < b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() < a.title.toLowerCase()
          ? -1
          : 0;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, title: "▲" });
    }
  };
  const toggleSortAuthors = () => {
    let books = [...booksResults];
    if (!sortDirection.authors || sortDirection.authors === "▲") {
      books = books.sort((a, b) => {
        return a.authors.join(",").toLowerCase() >
          b.authors.join(",").toLowerCase()
          ? 1
          : b.authors.join(",").toLowerCase() >
            a.authors.join(",").toLowerCase()
          ? -1
          : 0;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, authors: "▼" });
    } else {
      books = books.sort((a, b) => {
        return a.authors.join(",").toLowerCase() <
          b.authors.join(",").toLowerCase()
          ? 1
          : b.authors.join(",").toLowerCase() <
            a.authors.join(",").toLowerCase()
          ? -1
          : 0;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, authors: "▲" });
    }
  };
  const toggleSortIsbn = () => {
    let books = [...booksResults];
    if (!sortDirection.isbn || sortDirection.isbn === "▲") {
      books = books.sort((a, b) => {
        return a.isbn - b.isbn;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, isbn: "▼" });
    } else {
      books = books.sort((a, b) => {
        return b.isbn - a.isbn;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, isbn: "▲" });
    }
  };
  const toggleSortIsbn13 = () => {
    let books = [...booksResults];
    if (!sortDirection.isbn13 || sortDirection.isbn13 === "▲") {
      books = books.sort((a, b) => {
        return a.isbn13 - b.isbn13;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, isbn13: "▼" });
    } else {
      books = books.sort((a, b) => {
        return b.isbn13 - a.isbn13;
      });
      setBooksResults(books);
      setSortDirection({ ...sortDirection, isbn13: "▲" });
    }
  };

  return (
    <Container>
      {booksInfo === null ? (
        <EmptyBooksContainer>
          <h4>You currently have no books in your library.</h4>
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
                  No filter / Clear sort
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input onChange={filterSearch} />
            <InputGroupButtonDropdown
              addonType="append"
              isOpen={sortDropdown}
              toggle={toggleSortDropdown}
            >
              <DropdownToggle caret>Sort Library</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={toggleSortTitle}>
                  by Title {sortDirection.title}
                </DropdownItem>
                <DropdownItem onClick={toggleSortAuthors}>
                  by Authors {sortDirection.authors}
                </DropdownItem>
                <DropdownItem onClick={toggleSortIsbn}>
                  by Isbn {sortDirection.isbn}
                </DropdownItem>
                <DropdownItem onClick={toggleSortIsbn13}>
                  by Isbn13 {sortDirection.isbn13}
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
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
