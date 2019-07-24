import React, { Component } from 'react'
import styled from 'styled-components';
import { Card, CardBody, CardHeader, Button, Collapse, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddBookButton from './AddBookButton';

const AddBookCardDiv = styled.div`
    margin: 15px;
    font-family: 'Merriweather Sans';

    .imghold {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        img{
            width: 200px;
            padding: 5px;
            border-radius: 1px;
        }
    }

    .descHold {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-top: 1px solid rgb(240,240,240);
        border-bottom: 1px solid rgb(240,240,240);
        background-color: rgb(245,245,245);
        padding: 10px;
    }

    .buttonz {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
    }

    h6 {
        display: flex;
    }
`;
export default class AddBookCard extends Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false, modal: false };
        this.toggle = this.toggle.bind(this);
        this.togglem = this.togglem.bind(this);
        this.identifiers = this.identifiers.bind(this);
        this.authors = this.authors.bind(this);
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }

      togglem() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

      identifiers() {
        if(this.props.book.industryIdentifiers){
            return (this.props.book.industryIdentifiers.map(name => {
                return <CardHeader>{name.type}: {name.identifier}</CardHeader>
            })
            )
        } else {
            return <CardHeader>Identifiers not found</CardHeader>
        }
      }

      authors() {
          if(this.props.book.author_name){
          return (this.props.book.author_name.map(author => {
              return <div>by: {author}</div>
          }
            ))
        } else {
            return <div>N/A</div>
        }
      }

      coverPull(){
        if(this.props.book.cover_i){
            var coverUrl = "http://covers.openlibrary.org/b/id/" + this.props.book.cover_i + "-M.jpg";
            return coverUrl
          } else if (this.props.book.isbn) {
            var coverUrl = "http://covers.openlibrary.org/b/isbn/" + this.props.book.isbn[0] + "-M.jpg";
            return coverUrl
          } else if (this.props.book.id_goodreads) {
            var coverUrl = "http://covers.openlibrary.org/b/goodreads/" + this.props.book.id_goodreads[0] + "-M.jpg";
            return coverUrl
          } else if (this.props.book.id_librarything) {
            var coverUrl = "http://covers.openlibrary.org/b/librarything/" + this.props.book.id_librarything[0] + "-M.jpg";
            return coverUrl
          } else if (this.props.book.id_oclc) {
            var coverUrl = "http://covers.openlibrary.org/b/oclc/" + this.props.book.id_oclc[0] + "-M.jpg";
            return coverUrl
          } else if (this.props.book.thumbnail) {
            var coverUrl = this.props.book.thumbnail
            return coverUrl
          }
      }

    
    render() {
        return (
            <AddBookCardDiv>
                <Card className="heightLimiter">
                    <CardHeader tag="h4">
                        {this.props.book.title}
                    </CardHeader>
                    <CardHeader tag="h6">
                       {this.authors()}
                    </CardHeader>
                    <div class="imghold">
                        <img alt="thumbnail" src={this.coverPull()} />
                    </div>
                    <CardBody>
                        <Collapse isOpen={this.state.collapse}>
                            <CardHeader>Page Count: {this.props.book.pageCount}</CardHeader>
                            <CardHeader>Publisher: {this.props.book.publisher}</CardHeader>
                            <CardHeader>Published: {this.props.book.first_publish_year}</CardHeader>
                            <CardHeader>Description: </CardHeader>
                                <div class="descHold">
                                    {this.props.book.description}
                                </div>

                            <CardHeader>Google Books ID: {this.props.book.id}</CardHeader>
                            {this.identifiers()}
                        </Collapse>
                        <div class="buttonz">
                            <Button color="info" onClick={this.toggle} style={{ marginBottom: '1rem' }}>More details...</Button>
                            <Button color="success" onClick={this.togglem} >Add Book</Button>
                            <Modal isOpen={this.state.modal} toggle={this.togglem} className={this.props.className}>
                                <ModalHeader toggle={this.togglem}>Add to Library</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to add {this.props.book.title} to your library?
                                </ModalBody>
                                <ModalFooter>
                                    <AddBookButton onClick={this.togglem} book={this.props.book} />{' '}
                                    <Button color="danger" onClick={this.togglem}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>

                    </CardBody>
                </Card>
            </AddBookCardDiv>
        )
    }
}
