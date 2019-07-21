import React, { Component } from 'react'
import styled from 'styled-components';
import { Card, CardText, CardBody, CardHeader, Button, Collapse } from 'reactstrap';
import AddBookButton from './AddBookButton';

const AddBookCardDiv = styled.div`
    margin: 15px;
    font-family: 'Merriweather Sans';

    .imghold {
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .descHold {
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
`;
export default class AddBookCard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        this.toggle = this.toggle.bind(this);
        this.identifiers = this.identifiers.bind(this);
        this.authors = this.authors.bind(this);
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
        console.log(this.props.book)
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
          if(this.props.book.authors){
          return (this.props.book.authors.map(author => {
              return <div>{author}</div>
          }
            ))
        } else {
            return <div>N/A</div>
        }
      }

    
    render() {
        return (
            <AddBookCardDiv>
                <Card>
                    <CardHeader tag="h4">
                        {this.props.book.title}
                    </CardHeader>
                    <CardHeader tag="h6">
                       by: {this.authors()}
                    </CardHeader>
                    <div class="imghold">
                        <img alt="thumbnail" width="50%" src={this.props.book.thumbnail} />
                    </div>
                    <CardBody>
                        <Collapse isOpen={this.state.collapse}>
                            <CardHeader>Page Count: {this.props.book.pageCount}</CardHeader>
                            <CardHeader>Publisher: {this.props.book.publisher}</CardHeader>
                            <CardHeader>Published: {this.props.book.publishedDate}</CardHeader>
                            <CardHeader>Description: </CardHeader>
                                <div class="descHold">
                                    {this.props.book.description}
                                </div>

                            <CardHeader>Google Books ID: {this.props.book.id}</CardHeader>
                            {this.identifiers()}
                        </Collapse>
                        <div class="buttonz">
                            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>More details...</Button>
                            <AddBookButton book={this.props.book} />
                        </div>

                    </CardBody>
                </Card>
            </AddBookCardDiv>
        )
    }
}
