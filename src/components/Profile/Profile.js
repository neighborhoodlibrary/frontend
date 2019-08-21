import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import "firebase/auth";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CardContainer = styled.div`
  width: 50vw;
`;
const ProfileSlot = styled.p`
  display: flex;
  justify-content: space-between;
`;
const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Profile = () => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const alert = useAlert();
  const user = auth.currentUser;
  const userDB = db.collection("users").doc(`${auth.currentUser.uid}`);
  const [curUser, setCurUser] = useState({});
  const [values, setValues] = useState({
    displayName: "",
    loanPeriod: "",
    setDistance: "",
    favoriteBook: ""
  });
  const handleChanges = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    userDB
      .get()
      .then(doc => {
        if (doc.exists) {
          const curUser = doc.data();
          setValues({
            displayName: curUser.displayName,
            setDistance: curUser.setDistance,
            loanPeriod: curUser.loanPeriod,
            favoriteBook: curUser.favoriteBook
          });
          setCurUser(curUser);
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  };

  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => {
    editModal ? setEditModal(false) : setEditModal(true);
  };

  const updateProfile = () => {
    if (values.loanPeriod < 0 || values.setDistance < 0) {
      return (
        toggleEditModal(),
        alert.error(
          "Loan period and or distance restriction must be positive numbers"
        )
      );
    }
    if (!Number.isInteger(Number(values.loanPeriod))) {
      return (
        toggleEditModal(), alert.error("Loan period must be a whole number")
      );
    }
    userDB
      .update({
        ...values
      })
      .then(() => {
        toggleEditModal();
        alert.success("Successfully updated profile");
        getProfile();
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <PageContainer>
      <CardContainer>
        <Card>
          <CardHeader>
            <CardHeaderDiv>
              <h3>User Profile</h3>
              <Button onClick={toggleEditModal}>Edit</Button>
            </CardHeaderDiv>
          </CardHeader>
          <CardBody>
            <ProfileSlot>
              <div>DisplayName:</div>
              <div>{curUser.displayName}</div>
            </ProfileSlot>
            <ProfileSlot>
              <div>Restricted Distance:</div>
              <div>{curUser.setDistance} miles</div>
            </ProfileSlot>
            <ProfileSlot>
              <div>Loan Period:</div>
              <div>{curUser.loanPeriod} days</div>
            </ProfileSlot>
            <ProfileSlot>
              <div>Favorite Book:</div>
              <div>{curUser.favoriteBook}</div>
            </ProfileSlot>
          </CardBody>
        </Card>
      </CardContainer>
      <Modal isOpen={editModal} toggle={toggleEditModal} centered>
        <ModalHeader>Edit User Profile</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="dName">Display Name:</Label>
              <Input
                id="dName"
                name="displayName"
                value={values.displayName}
                onChange={handleChanges}
                placeholder="Display Name"
                type="text"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="sDist">Set Distance:</Label>
              <Input
                id="sDist"
                name="setDistance"
                value={values.setDistance}
                onChange={handleChanges}
                placeholder="Set Distance restriction"
                type="number"
              />
              <FormText color="muted">
                Set Distance other libraries will be able to find you, (in
                miles)
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="lPeriod">Loan Period:</Label>
              <Input
                id="lPeriod"
                name="loanPeriod"
                value={values.loanPeriod}
                onChange={handleChanges}
                placeholder="Set Loan period"
                type="number"
              />
              <FormText color="muted">
                Set Loan period for your books in days, (average is 21 days)
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="fBook">Favorite Book:</Label>
              <Input
                id="fBook"
                name="favoriteBook"
                value={values.favoriteBook}
                onChange={handleChanges}
                placeholder="Favorite Book"
                type="text"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updateProfile}>Submit Changes</Button>
          <Button onClick={toggleEditModal}>Back</Button>
        </ModalFooter>
      </Modal>
    </PageContainer>
  );
};

export default Profile;

// import React, { useContext, useState } from 'react';
// import UserContext from "../../context/user/userContext";
// import "firebase/auth";
// import firebase from "../../firebase/firebase.utils";
// import './Profile.css';
// export default function Profile() {
//     const db = firebase.firestore();
//     const auth = firebase.auth();
//     var userContext = useContext(UserContext);
//     var curUser = userContext.userState.user;
//     const userDB = db.collection("users").doc(`${auth.currentUser.uid}`);
//     const [values, setValues] = useState({
//         edited: {
//           displayName: curUser.displayName,
//           favoriteBook: curUser.favoriteBook
//         },
//         locked: {
//           displayName: curUser.displayName,
//           favoriteBook: curUser.favoriteBook,
//           uid: curUser.uid
//         }
//       });

//     const [edit, setEdit] = useState({
//       isOn: false
//     })

//     const toggleEdit = () => {
//       setEdit({...edit, isOn: !edit.isOn});
//     }

//     const handleChanges = e => {
//         const { name, value } = e.target;
//         setValues(
//           { ...values,
//              edited: {
//               [name]: value }
//         });
//       };

//     const updateProfile = e => {
//       e.preventDefault();
//       userDB.update(values.edited)
//         .then(function() {
//           console.log("updated")
//         })
//         .catch(function(error) {
//           console.log(error);
//         })

//         setValues({
//           ...values,
//           locked: values.edited
//         });

//         userDB.get().then(function(user) {
//           userContext.addUser(user.data())
//         }).catch(function(error) {
//           console.log(error);
//         })

//         toggleEdit();
//     }

//     if(edit.isOn === false) {
//       return (
//           <div className="editProfile">
//             <div className="editOff">
//               <div className="profileBox">

//                   <div className="profileSlot"><h3>
//                   Display Name:
//                   </h3><p>
//                   {values.locked.displayName}
//                   </p></div>

//                   <div className="profileSlot"><h3>
//                   Favorite Book:
//                   </h3> <p>
//                   {values.locked.favoriteBook}
//                   </p></div>

//               </div>
//               <button className="heartbeat" onClick={toggleEdit}>Edit</button>
//             </div>
//           </div>
//       )
//     } else {
//       return (
//         <div className="editProfile">
//           <div className="editOn">
//             <form onSubmit={updateProfile}>
//               <input name="displayName" value={values.edited.displayName} onChange={handleChanges} placeholder="Enter display name" />
//               <input name="favoriteBook" value={values.edited.favoriteBook} onChange={handleChanges} placeholder="Enter your favorite Book" />
//               <button>Submit Changes</button>
//             </form>
//             <button onClick={toggleEdit}>Close Edit</button>
//           </div>
//         </div>
//       )
//     }

// }
