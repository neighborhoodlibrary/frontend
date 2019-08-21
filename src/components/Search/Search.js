import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import firebase from "../../firebase/firebase.utils";
import styled from "styled-components";
import Slider from "react-input-slider";
import {
  Col,
  Form,
  Button,
  Label,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import { useAlert } from "react-alert";
import { GeoFire } from "geofire";
import SearchBookCard from "./SearchBookCard";

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DistanceContainerDiv = styled.div`
  display: flex;
  margin: auto;
`;
const ButtonContainerDiv = styled.div`
  margin-top: 0.5rem;
  margin-left: 4rem;
`;
const SliderContainerDiv = styled.div`
  margin-bottom: 2rem;
`;
const mapStyle = {
  height: "55vh",
  width: "40vw"
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 870px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const SearchBookDiv = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBookButtonDiv = styled.div`
  margin-left: 50px;
`;

const InfoGuide = styled.h6`
  margin: 10px 0px;
`;

const InputContainerDiv = styled.div`
  margin: 10px 0px 0px 0px;
`;

const Search = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const alert = useAlert();
  const docRef = firebase.firestore().collection("books");
  //
  const firebaseRef = firebase.database().ref("coordinates");
  const geoFire = new GeoFire(firebaseRef);
  //
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({});
  const [resultsArray, setResultsArray] = useState([]);
  //
  const [sliderValue, setSliderValue] = useState({ x: 0.1 });
  const [distanceValue, setDistanceValue] = useState("");
  //
  const [activeMarker, setActiveMarker] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  //
  const [booksArray, setBooksArray] = useState([]);
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

  useEffect(() => {
    setDefaultCenter({
      lat: 39.11599111031897,
      lng: -95.63578119495679
    });
    setDefaultZoom(4);
    geoFire.get(user.uid).then(
      location => {
        if (location) {
          setDefaultCenter({
            lat: Number(location[0]),
            lng: Number(location[1])
          });
          setDefaultZoom(15);
          setMarkerPosition({
            lat: Number(location[0]),
            lng: Number(location[1])
          });
        } else {
          console.log("Provided key is not in GeoFire");
        }
      },
      error => {
        console.log("Error: " + error);
      }
    );
  }, {});

  useEffect(() => {
    switch (sliderValue.x) {
      case 0.1:
        setDistanceValue(".5");
        setDefaultZoom(15);
        break;
      case 0.2:
        setDistanceValue("1");
        setDefaultZoom(14);
        break;
      case 0.3:
        setDistanceValue("2");
        setDefaultZoom(13);
        break;
      case 0.4:
        setDistanceValue("4");
        setDefaultZoom(12);
        break;
      case 0.5:
        setDistanceValue("8");
        setDefaultZoom(11);
        break;
      case 0.6:
        setDistanceValue("16");
        setDefaultZoom(10);
        break;
      case 0.7:
        setDistanceValue("32");
        setDefaultZoom(9);
        break;
      case 0.8:
        setDistanceValue("64");
        setDefaultZoom(8);
        break;
      case 0.9:
        setDistanceValue("128");
        setDefaultZoom(7);
        break;
      case 1.0:
        setDistanceValue("Global");
        setDefaultZoom(2);
        break;
      default:
        break;
    }
  });

  const populateLibraryFunc = e => {
    e.preventDefault();
    let searchDistance = distanceValue;
    if (searchDistance === "Global") {
      searchDistance = 3958.8;
    }
    const radiusInKm = searchDistance * 1.60934;
    const geoQuery = geoFire.query({
      center: [defaultCenter.lat, defaultCenter.lng],
      radius: radiusInKm
    });
    const results = [];
    geoQuery.on("key_entered", (key, location, distance) => {
      if (key !== user.uid)
        results.push({
          userId: key,
          lat: location[0],
          lng: location[1],
          distance: distance * 0.621371
        });
    });
    geoQuery.on("ready", () => {
      if (results.length === 0) {
        setResultsArray([]);
        alert.error("No personal libraries in your search distance.");
      } else {
        setResultsArray(results);
      }
    });
  };

  const onMapClick = () => {
    if (showingInfoWindow === true) {
      setShowingInfoWindow(false);
      setActiveMarker({});
    }
  };

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const searchBooksFunc = () => {
    let tempBooksArr = [];
    async function asyncForEach(arr, cb) {
      for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
      }
    }
    const aFunc = async () => {
      await asyncForEach(resultsArray, async user => {
        let userId = user.userId;
        await docRef
          .where("ownerId", "==", userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let book = doc.data();
              tempBooksArr.push(book);
            });
          });
      });
      // tempBooksArr.length > 0
      //   ? setBooksArray(tempBooksArr)
      //   : setBooksArray(null);
      if (tempBooksArr.length > 0) {
        setBooksArray(tempBooksArr);
        setBooksResults(tempBooksArr);
      } else {
        setBooksArray(null);
        setBooksResults(null);
      }
    };
    aFunc();
  };

  // filter
  const toggleFilterDropdown = () => {
    filterDropdown ? setFilterDropdown(false) : setFilterDropdown(true);
  };
  const handleFilterName = filterInput => {
    if (filterInput === null) {
      setFilterName(null);
      setSortDirection({ authors: "", isbn: "", isbn13: "", title: "" });
      setBooksResults([...booksArray]);
    }
    setFilterName(filterInput);
  };
  const filterSearch = e => {
    let books = [...booksArray];
    if (filterName === null) {
      setBooksResults([...booksArray]);
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
    <ContainerDiv>
      <Col xs="12" md="6">
        <Form>
          <Label tag="h5">
            Choose desired distance to search for other personal libraries.
          </Label>
          <DistanceContainerDiv>
            <SliderContainerDiv>
              <Label tag="h6">{`Distance: ${distanceValue} ${
                distanceValue === "Global" ? "search" : "miles"
              }`}</Label>
              <Slider
                axis="x"
                xstep={0.1}
                xmin={0.1}
                xmax={1}
                x={sliderValue.x}
                onChange={({ x }) =>
                  setSliderValue({ x: parseFloat(x.toFixed(2)) })
                }
              />
            </SliderContainerDiv>
            <ButtonContainerDiv>
              <Button onClick={populateLibraryFunc}>
                Search for Libraries
              </Button>
            </ButtonContainerDiv>
          </DistanceContainerDiv>
        </Form>
        <Map
          google={props.google}
          center={defaultCenter}
          zoom={defaultZoom}
          style={mapStyle}
          onClick={onMapClick}
        >
          <Marker position={markerPosition} />
          {resultsArray.length > 0
            ? resultsArray.map(result => (
                <Marker
                  key={Math.random()}
                  position={{ lat: result.lat, lng: result.lng }}
                  name={result.distance}
                  onClick={onMarkerClick}
                />
              ))
            : ""}
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <p>
              Distance from your location:{" "}
              {Math.round(activeMarker.name * 100) / 100} miles
            </p>
          </InfoWindow>
        </Map>
      </Col>
      <Col xs="12" md="6">
        <SearchBookDiv>
          <h5>Search for books within the set search distances</h5>
          <SearchBookButtonDiv>
            <Button onClick={searchBooksFunc}>Search for Books</Button>
          </SearchBookButtonDiv>
        </SearchBookDiv>
        <div>
          {booksArray === null ? (
            <div>
              <InfoGuide>
                No books to borrow in the area, change search radius
              </InfoGuide>
            </div>
          ) : booksArray.length > 0 ? (
            <div>
              <InputContainerDiv>
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
                      <DropdownItem
                        onClick={() => handleFilterName("language")}
                      >
                        Language
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleFilterName("description")}
                      >
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
              </InputContainerDiv>
              <InfoGuide>Book results:</InfoGuide>
              <Container>
                {booksResults.map(book => (
                  <SearchBookCard key={Math.random()} book={book} />
                ))}
              </Container>
            </div>
          ) : (
            <div>
              <InfoGuide>
                Start by setting the search radius of your search
              </InfoGuide>
            </div>
          )}
        </div>
      </Col>
    </ContainerDiv>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ"
})(Search);
