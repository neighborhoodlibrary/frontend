import React from 'react';
import AddBookCard from './AddBookCard';
import styled from 'styled-components';

const BookMapDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
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
