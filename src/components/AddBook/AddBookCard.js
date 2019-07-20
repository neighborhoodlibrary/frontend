import React, { Component } from 'react'
import styled from 'styled-components';
import { Card, CardImg, CardBody, CardHeader, Button, Collapse } from 'reactstrap';

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
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }
    
    render() {
        return (
            <AddBookCardDiv>
                <Card>
                    <CardHeader>
                        {this.props.book.title}
                    </CardHeader>
                    <div class="imghold">
                        <img width="50%" src={this.props.book.thumbnail} />
                    </div>
                    <CardBody>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>More details...</Button>
                    </CardBody>
                    <Collapse isOpen={this.state.collapse}>
                        extra details here
                    </Collapse>
                </Card>
            </AddBookCardDiv>
        )
    }
}
