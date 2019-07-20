import React from 'react';
import styled from 'styled-components';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Collapse } from 'reactstrap';

const AddBookCardDiv = styled.div`
    margin: 15px;
    width: 200px;
    height: 450px;
`;

export default function AddBookCard(props) {

    return (
        <AddBookCardDiv>
            <Card>
                    <CardBody>
                        <CardTitle>
                            {props.book.title}
                        </CardTitle>
                    </CardBody>
                    <CardImg top src={props.book.thumbnail} />

            </Card>
        </AddBookCardDiv>
    )
}
