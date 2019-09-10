import React, { useEffect, useState } from 'react';
import firebase from "../../../firebase/firebase.utils";
import "firebase/auth";
import styled from 'styled-components';

const AnalyticsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    background-color: rgb(0,0,0,0.025);
    border-right: 1px solid rgba(0,0,0,.2);
    border-bottom: 1px solid rgba(0,0,0,.2);
    box-sizing: border-box;

    #a2{
        font-size: 2.2em;
        line-height: 0;
        padding: 0px 5px;
    }

    #a3{
        font-size: 1em;
        line-height: 0;
    }

    #a4{
        font-size: .875em;
        display: flex; 
        justify-content: center;
        padding: 2px;
        box-sizing: border-box;
    }

    .counts {
        display: flex;
        justify-content: center;    
        align-items: end;
    }

`

export default function Analytics() {
    const db = firebase.firestore();

    const docRef = db.collection("count").doc("counter");

    const [thecounts, setTheCounts] = useState({
        userCount: 0,
        bookCount: 0
    })

    const loadCount = () => {
        docRef.onSnapshot(function(doc) {
            let theData = doc.data();
            setTheCounts({
                userCount: theData.userCount,
                bookCount: theData.bookCount
            })
        })
    }

    useEffect(() => {
        loadCount();
      }, []);

    return (
        <AnalyticsDiv>
                <p id="a4">
                    We currently have...
                </p> 
                <p className="counts">
                    <p id="a2">
                        {thecounts.bookCount}  
                    </p> 
                    <p id="a3">
                        books
                    </p> 
                </p>
                <p id="a4">
                    across
                </p> 
                <p className="counts">
                    <p id="a2">
                        {thecounts.userCount}
                    </p> <p id="a3">
                        users.
                    </p>
                </p>
        </AnalyticsDiv>
    )
}
