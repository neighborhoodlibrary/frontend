import React, { Component } from 'react'
import styled from 'styled-components';
import { Card, CardText, CardBody, CardHeader, Button, Collapse } from 'reactstrap';

const AddBookCardDiv = styled.div`
    margin: 15px;
    font-family: 'Merriweather Sans';

    .imghold {
        display: flex;
        justify-content: center;
        padding: 10px;
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
        return (this.props.book.industryIdentifiers.map(name => {
            return <CardHeader>{name.type}: {name.identifier}</CardHeader>
        })
        )
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
                        <img width="50%" src={this.props.book.thumbnail} />
                    </div>
                    <CardBody>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>More details...</Button>

                    <Collapse isOpen={this.state.collapse}>
                        <CardHeader>Page Count: {this.props.book.pageCount}</CardHeader>
                        <CardHeader>Publisher: {this.props.book.publisher}</CardHeader>
                        <CardHeader>Published: {this.props.book.publishedDate}</CardHeader>
                        <CardHeader>Description: </CardHeader> <CardText padding="5px">
                            {this.props.book.description}
                        </CardText>
                        <CardHeader>Google Books ID: {this.props.book.id}</CardHeader>
                        {this.identifiers()}
                    </Collapse>
                    </CardBody>
                </Card>
            </AddBookCardDiv>
        )
    }
}
