import React from 'react';
import AddBookCard from './AddBookCard';
import styled from 'styled-components';

const BookMapDiv = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media(max-width: 1100px){
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media(max-width: 870px){
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 550px){
        grid-template-columns: 1fr;
    }
`;

export default function BookMap(props) {
    if(props.resultsarr === null){
        return <div>0 results</div>
    } else if (props.resultsarr === undefined){
        return <div>0 results.</div>
    } else {
        return (
            <BookMapDiv>
            <React.Fragment>
                {props.resultsarr.map(book => (
                    <AddBookCard book={book} key={book.id} />
                ))}
            </React.Fragment>
            </BookMapDiv>
        )
    }

}
