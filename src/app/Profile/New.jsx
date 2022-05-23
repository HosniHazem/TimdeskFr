import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AuthUser from '../Session/AuthUser';

import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import DefaultUserPic from "../../images/default.png";
import { Container, Row, Col, Form } from "react-bootstrap";

export default function Profile(props){
  const {http} = AuthUser();

  const history = useHistory();
   const [handleInputChange, sethandleInputChange] = useState({
    selectedFile:'',
});
  const [user, setUser] = useState({
    name: "",
      firstName: "",
      phone: "",
      password: "",
      confirmed_password: "",
      error_list: [],
      error: "",
      error: "",
      avatar: "",
      msg: "",
});
const [changeProfileImage, setchangeProfileImage] = useState({
  uploadedFile: null,

});
const handleInput = (e) => {
  e.persist();
 
  setUser({...handleInput, [e.target.name]: e.target.value });
}

  useEffect(() => {
    fetchConge();
  }, []);
  const fetchConge = () => {
    http.post('/me').then((res) => {
      if (res.data.status === 200) {

      setUser({
        name: res.data.user[0].name,
        firstName: res.data.user[0].firstName,
        //   password: res.data.user[0].password,

        phone: res.data.user[0].phone,
        avatar: res.data.user[0].avatar,
      });
       
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");

        history.push("/app/profile");
      }
     else {
      
      swal("error_list",handleInput.validate_err,"error_list");
    
  
}

    });
  };

  const updateConge = async (e) => {
    e.preventDefault();
    const  data = {
      name: handleInput.name,
      firstName: handleInput.firstName,
      phone: handleInput.phone,
      avatar: handleInput.avatar,
    }
    const res = await axios.put(`api/profile/update-profile`,data );
   
  
    if (res.data.status === 200) {
      swal({
        title: "Succès",
        text: res.data.message,
        icon: "success",
        button: "Fermer",
      });

      this.props.history.push("/app/profile");
    } else if (res.data.status === 404) {
      swal({
        title: "Echec !",
        text: res.data.message,
        icon: "warning",
        button: "Fermer",
      });
    } else {
      setUser({
        error_list: handleInput.validate_err,
      });
    }
  };

    if (handleInput.avatar) {
      var imagestr = handleInput.avatar;
      imagestr = imagestr.replace("http://localhost:8000/uploads/avatars/", "");
      var profilePic = "http://localhost:8000/uploads/avatars/" + imagestr;
    } else {
      profilePic = DefaultUserPic;
    }

    return (
      <Container>
        <Row>
          <img
            className="img-fluid img-thumbnail"
            src={profilePic}         
               alt="profils pic"
            style={{ width: 300, height: 350 }}
          />

          <Col>
            <div className="card">
              <div className="card-header col-md-15">
                <h1>Modifier profile</h1>
                <Form className="form" onSubmit={updateConge}>
                  <p>{user.msg}</p>

                  <Form.Group
                    controlId="formCategory1"
                  >
                    <Form.Label className="col-sm-2 fw-bold">Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInput}
                    />
                   

                    <br></br>
                  </Form.Group>
                  <Form.Group controlId="formCategory2">
                    <Form.Label className="col-sm-2 fw-bold">Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInput}
                    />{" "}
                   
                    <br></br>
                  </Form.Group>
                  <Form.Group controlId="formCategory4">
                    <Form.Label className="col-sm-2 fw-bold">
                      Image de profile
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="profileImage"
                      onChange={changeProfileImage}
                    />{" "}
                    
                    <br></br>
                  </Form.Group>

                  <Form.Group controlId="formCategory2">
                    <Form.Label className="col-sm-2 fw-bold">
                      Télephone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />{" "}
                    
                    <br></br>
                  </Form.Group>
                  <Form.Group controlId="formCategory2">
                    <Form.Label className="col-sm-2 fw-bold">
                      Mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </Form.Group>

                  <br></br>
                  <Form.Group controlId="formCategory2">
                    <Form.Label className="col-sm-2 fw-bold">
                      Confirmer mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmed_password"
                      value={user.confirmed_password}
                      onChange={handleInput}
                    />
                  
                  </Form.Group>
                  <br></br>

                  <button
                    className="deleteButton"
                    id="updatetn"
                    type="submit"
                  //  onClick={UpdateProfileHandler}
                  >
                    Modifier Profile
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
    
    }
