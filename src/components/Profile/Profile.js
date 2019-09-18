import React, { useState, useEffect } from "react";
import "firebase/auth";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
import {
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

const ProfileHold = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: auto;
  
  @media(max-width: 800px) {
    padding: 10px;
  }
`;

const ProfHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(80,80,80);
  border-radius: 2px;
  font-family: 'Merriweather';
  color: white;
  padding: 10px;

  #profHead {
    font-size: 1.1em;
  }
`;

const ProfileFields = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgb(127, 173, 80);
  color: white;
  margin-bottom: 10px;

  #notesDiv {
    min-height: 150px;
  }

  #field {
    display: flex;
    margin: 7px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    #fieldName {
      font-size: 1.05em;
    }

    #fieldValue {

    }
  }
`;

const Profile = () => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const alert = useAlert();
  const user = auth.currentUser;
  const userDB = db.collection("users").doc(`${user.uid}`);
  const [curUser, setCurUser] = useState({});
  const [values, setValues] = useState({
    displayName: "",
    loanPeriod: null,
    setDistance: null,
    favoriteBook: ""
  });
  const [editModal, setEditModal] = useState(false);
  const [noteValues, setNoteValues] = useState("");
  const [notesModal, setNotesModal] = useState(false);
  const handleChanges = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleNoteChanges = e => {
    setNoteValues(e.target.value);
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
          setNoteValues(curUser.notes);
          setCurUser(curUser);
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  };

  const toggleEditModal = () => {
    editModal ? setEditModal(false) : setEditModal(true);
  };
  const toggleNotesModal = () => {
    notesModal ? setNotesModal(false) : setNotesModal(true);
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

  const submitEditNotes = () => {
    userDB
      .update({
        notes: noteValues
      })
      .then(() => {
        toggleNotesModal();
        alert.success("Successfully edited notes");
        getProfile();
      })
      .catch(error => {
        console.log("Error updating document: ", error);
      });
  };

  return (
    <ProfileHold>

              <ProfHeader>
              	<div id="profHead">User Profile</div>
              	<Button onClick={toggleEditModal}>Edit</Button>
              </ProfHeader>

              <ProfileFields>
                <div id="field">
                  <div id="fieldName">Display Name:</div>
                  <div id="fieldValue">{curUser.displayName}</div>
                </div>
        
                <div id="field">
                  <div>Restricted Distance:</div>
                  <div>{curUser.setDistance} miles</div>
                </div>
                      
                <div id="field">
                  <div>Loan Period:</div>
                  <div>{curUser.loanPeriod} days</div>
                </div>
        
                <div id="field">
                  <div>Favorite Book:</div>
                  <div>{curUser.favoriteBook}</div>
                </div>
                
              </ProfileFields>

              <ProfHeader>
                <div id="profHead">Notes</div>
              </ProfHeader>

            <ProfileFields>
              
              <div id="notesDiv">
                {curUser.notes}
              </div>
            </ProfileFields>
              <Button onClick={toggleNotesModal}>Edit Notes</Button>
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
      <Modal isOpen={notesModal} toggle={toggleNotesModal} centered>
        <ModalHeader>Edit notes</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="notes">Custom Notes:</Label>
              <Input
                id="notes"
                name="noteValues"
                value={noteValues}
                onChange={handleNoteChanges}
                placeholder="Custom notes"
                type="textarea"
                style={{ height: "50vh" }}
              />
              <FormText color="muted">
                Create a book list, notes about other libraries or anything you
                want.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitEditNotes}>Confirm</Button>
          <Button onClick={toggleNotesModal}>Back</Button>
        </ModalFooter>
      </Modal>
    </ProfileHold>
  );
};

export default Profile;
