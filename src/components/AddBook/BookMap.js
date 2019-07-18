import React from 'react'

export default function BookMap(props) {
    if(props.results){
        return(
            <React.Fragment>
                {props.results.map(book => (
                    <div>{book.title}</div>
                ))}
            </React.Fragment>
        )
    } else {
        return <div>No results...</div>
    }

}
