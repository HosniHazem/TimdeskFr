import { useEffect, useState } from "react";
import AuthUser from "../Session/AuthUser";
import DefaultUserPic from "../../images/default.png";
import React from "react";
import "./new.scss";
import axios from "axios";
import swal from "sweetalert";

export default function New() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [errorInput, setError] = useState([]);

  const [handleInputChangee, setHandleInputChange] = useState({
    selectedFile: "",
  });
  const [changeProfileImage, setchangeProfileImage] = useState({
    uploadedFile: null,
  });
  const changeProfileImagee = (event) => {
    setchangeProfileImage({
      ...changeProfileImage,
      uploadedFile: event.target.files[0],
    });
  };

  const handleInputChange = (event) => {
    event.persist();
    setHandleInputChange({
      ...handleInputChangee,
      selectedFile: event.target.files[0],
    });
  };
  const handleInput = (e) => {
    setUserdetail({ ...userdetail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserDetail = () => {
      http.post("/me").then((res) => {
        setUserdetail(res.data);
      });
    };
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateProfileHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: userdetail.name,
      phone_no: userdetail.phone_no,

      profile_picture: userdetail.profile_picture,
    };

    //create object of form data
    const formData = new FormData();
    formData.append("profile_picture", changeProfileImagee.uploadedFile);

    formData.append("id", changeProfileImagee.id);

    const res = http.put(`/profile/update-profile`, data);

    const res1 = axios.post("/api/sample-restful-apis", formData, {
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.status === 200 && res1.status === 200) {
        swal({
            title: "Succès",
            text: res.data.message,
            icon: "success",
            button: "Fermer",
          });
      window.location.reload();

      console.log("Congé modifier avec succès");
    } else if (res.status === 404 && res1.status === 404) {
        swal({
            title: "Echec !",
            text: res.data.message,
            icon: "warning",
            button: "Fermer",
          });
        } else {
      swal("Error", userdetail.name, "error");
      setError([]);
    }
  };
  if (userdetail.profile_picture) {
    var imagestr = userdetail.profile_picture;
    imagestr = imagestr.replace("http://localhost:8000/images/uploads/", "");
    var profilePic = "http://localhost:8000/images/uploads/" + imagestr;
  } else {
    profilePic = DefaultUserPic;
  }
  function renderElement() {
    if (userdetail) {
      return (
        <div className="new">
          <div className="newContainer">
            <div className="top">
              <h1></h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img src={profilePic} alt="" />
              </div>
              <div className="right">
                <form onSubmit={UpdateProfileHandler}>
                  <div className="formInput">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userdetail.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone_no"
                      value={userdetail.phone_no}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="formInput">
                    <label htmlFor="file">Image:</label>
                    <input
                      class="form-control"
                      type="file"
                      name="profile_picture"
                      onChange={changeProfileImagee}
                    />
                  </div>
                  <button type="submit" id="updatetn">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <div>{renderElement()}</div>;
}
