import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Logout from '../Session/logout'
import {styled } from '@mui/system'
import DefaultUserPic from "../../images/default.png";


const IMG = styled('img')(() => ({
  width: '15%',
}))
let info = sessionStorage.getItem("user");
// eslint-disable-next-line 
let userInfo = JSON.parse(info);
// eslint-disable-next-line 
var NameInfo="";
 var EmailInfo="";
 var PhotoInfo=null;
 var RoleInfo=null;
if(userInfo){
  
   NameInfo=userInfo.name;
   EmailInfo=userInfo.email;
   PhotoInfo=userInfo.profile_picture;
   RoleInfo=userInfo.RoleID;

}

if (PhotoInfo!=null) {
  var imagestr = userInfo.profile_picture;
  var profilePic = "http://localhost:8000/images/uploads/" + imagestr;
} else {
  profilePic = DefaultUserPic;
}
console.log(PhotoInfo)
export class Header extends Component {



  closeMenu(e) {
    e.target.closest(".dropdown ").classList.remove("show");
    e.target.closest(".dropdown  .dropdown-menu ").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show ");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  render() {
    if(RoleInfo=="1"){

    return (
      <div>
        <div className="az-header">
          <div className="container" >
            
          
                            <IMG 
                                    src="/assets/Timdesk.png"
                                    alt=""
                                />
                             
              <a
                id="azMenuShow"
                onClick={event => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
        
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <Link to="/" className="az-logo">
                  <span></span> Timdesk
                </Link>
                <a
                  href="#/"
                  onClick={event => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              <ul className="nav ">
                <li
                  className={
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dashboard" className="nav-link ">
                    <i className="typcn typcn-chart-area-outline "></i> Dashboard
                  </Link>
                </li>
                
                <li
                  className={
                    this.isPathActive("/ticket")
                      ? "nav-item active "
                      : "nav-item"
                  }
                >
                  <Link to="/ticket" className="nav-link">
                    <i className=" typcn typcn-ticket"></i> Ticket
                  </Link>
                </li>

                
              

                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/levels") ||
                      this.isPathActive("/status") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className=" typcn typcn-cog"></i> Admin Settings
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub az-menu-sub-mega">
                      <div className="container">
                        <div>
                          <nav className="nav">
                            
                            <Link
                              to="/levels"
                              className={
                                this.isPathActive("/levels")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Levels
                            </Link>
                            <Link
                              to="/status"
                              className={
                                this.isPathActive("/status")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Status
                            </Link>
                            <Link
                              to="/category"
                              className={
                                this.isPathActive("/category")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                               Category
                            </Link>
                          </nav>
                        </div>
                        <div>
                          <nav className="nav">
                          <Link
                              to="/Priority"
                              className={
                                this.isPathActive("/Priority")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Priority
                            </Link>
                            <Link
                              to="/subcategory"
                              className={
                                this.isPathActive("/subcategory")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              SubCategory
                            </Link>
                           
                            
                          </nav>
                          
                        </div>
                        <div>
                          <nav className="nav">
                            
                            <Link
                              to="/requesttype"
                              className={
                                this.isPathActive("/requesttype")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              RequestType
                            </Link>
                          </nav>
                        </div>
                        <div>
                          <nav className="nav">
                           
                           
                
                          <Link
                              to="/user"
                              className={
                                this.isPathActive("/user")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Admin And Agent
                            </Link>
                           
                            <Link
                              to="/client"
                              className={
                                this.isPathActive("/client")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Client
                            </Link>
                           
                          </nav>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
             
              </ul>
            </div>
            <div className="az-header-right">

              <div className="az-header-message">
                <Link to="/messages">
                  <i className="typcn typcn-messages"></i>
                </Link>
              </div>
              {/* <Dropdown className="az-header-notification">
                <Dropdown.Toggle as={"a"} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media new">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img2.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          Congratulate <strong>Socrates Itumay</strong> for work
                          anniversaries
                        </p>
                        <span>Mar 15 12:32pm</span>
                      </div>
                    </div>
                    <div className="media new">
                      <div className="az-img-user online">
                        <img
                          src={require("../../assets/images/Defaultuse.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Joyce Chua</strong> just created a new blog
                          post
                        </p>
                        <span>Mar 13 04:16am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Althea Cabardo</strong> just created a new
                          blog post
                        </p>
                        <span>Mar 13 02:56am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Adrian Monino</strong> added new comment on
                          your photo
                        </p>
                        <span>Mar 12 10:40pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
          <div className="ml-3"><a>{userInfo.name}</a></div>
              <Dropdown name="profil" className="az-profile-menu">
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  
                  <img
                    src={profilePic}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <div className="az-img-user" id="ff">
                      <img
                       src={profilePic}
                      alt=""
                      ></img>
                    </div>
                    <h6>{NameInfo}</h6>
                    <span>{EmailInfo}</span>
                  </div>

                  <a href="/profil" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </a>
                  
                  
                  
                  <div className="dropdown-item">
                    <i className="typcn typcn-power-outline dropdown-item"></i>< Logout/>
                    </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }else if(RoleInfo=="2"){
    return (
      <div>
        <div className="az-header">
          <div className="container" >
            
          
                            <IMG 
                                    src="/assets/Timdesk.png"
                                    alt=""
                                />
                             
              <a
                id="azMenuShow"
                onClick={event => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
        
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <Link to="/" className="az-logo">
                  <span></span> Timdesk
                </Link>
                <a
                  href="#/"
                  onClick={event => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              <ul className="nav">
                <li
                  className={
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dashboard" className="nav-link">
                    <i className="typcn typcn-chart-area-outline"></i> Dashboard
                  </Link>
                </li>
                
               
                <li
                  className={
                    this.isPathActive("/agent/myticket")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/agent/myticket" className="nav-link">
                    <i className=" typcn typcn-ticket"></i> Assigned Tickets
                  </Link>
                </li>
                <li
                  className={
                    this.isPathActive("/ticket/open")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/ticket/open" className="nav-link">
                    <i className="typcn typcn-pencil"></i> Available Tickets
                  </Link>
                </li>

                
              
{/* 
                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/general-pages")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className="typcn typcn-document"></i> Pages
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub">
                      <Link
                        to="/general-pages/signin"
                        className={
                          this.isPathActive("/general-pages/signin")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/general-pages/signup"
                        className={
                          this.isPathActive("/general-pages/signup")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign Up
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li> */}
                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/levels") ||
                      this.isPathActive("/status") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div className="az-header-right">
           
             
              <div className="az-header-message">
                <Link to="/messages">
                  <i className="typcn typcn-messages"></i>
                </Link>
              </div>
              {/* <Dropdown className="az-header-notification">
                <Dropdown.Toggle as={"a"} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media new">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img2.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          Congratulate <strong>Socrates Itumay</strong> for work
                          anniversaries
                        </p>
                        <span>Mar 15 12:32pm</span>
                      </div>
                    </div>
                    <div className="media new">
                      <div className="az-img-user online">
                        <img
                          src={require("../../assets/images/Defaultuse.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Joyce Chua</strong> just created a new blog
                          post
                        </p>
                        <span>Mar 13 04:16am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Althea Cabardo</strong> just created a new
                          blog post
                        </p>
                        <span>Mar 13 02:56am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Adrian Monino</strong> added new comment on
                          your photo
                        </p>
                        <span>Mar 12 10:40pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
          <div className='ml-3'><a >{userInfo.name}</a></div>
              <Dropdown name="profil" className="az-profile-menu">
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  
                  <img
                    src={profilePic}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <div className="az-img-user">
                      <img
                       src={profilePic}
                      alt=""
                      ></img>
                    </div>
                    <h6>{NameInfo}</h6>
                    <span>{EmailInfo}</span>
                  </div>

                  <a href="/profil" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </a>
                  
                  
                  
                  <div className="dropdown-item">
                    <i className="typcn typcn-power-outline dropdown-item"></i>< Logout/>
                    </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }else if(RoleInfo=="3"){
    return (
      <div>
        <div className="az-header">
          <div className="container" >
            
          
                            <IMG 
                                    src="/assets/Timdesk.png"
                                    alt=""
                                />
                             
              <a
                id="azMenuShow"
                onClick={event => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
        
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <Link to="/" className="az-logo">
                  <span></span> Timdesk
                </Link>
                <a
                  href="#/"
                  onClick={event => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              <ul className="nav">
                <li
                  className={
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dashboard" className="nav-link">
                    <i className="typcn typcn-chart-area-outline"></i> Dashboard
                  </Link>
                </li>
                
                <li
                  className={
                    this.isPathActive("/client/ticket")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/client/ticket" className="nav-link">
                    <i className=" typcn typcn-ticket"></i> Ticket
                  </Link>
                </li>
                <li
                  className={
                    this.isPathActive("/profil")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/profil" className="nav-link">
                    <i className="typcn typcn-cog"></i> Profil Setting
                  </Link>
                </li>

                
              
{/* 
                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/general-pages")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className="typcn typcn-document"></i> Pages
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub">
                      <Link
                        to="/general-pages/signin"
                        className={
                          this.isPathActive("/general-pages/signin")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/general-pages/signup"
                        className={
                          this.isPathActive("/general-pages/signup")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign Up
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li> */}
                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/levels") ||
                      this.isPathActive("/status") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div className="az-header-right">
           
             
             
              {/* <Dropdown className="az-header-notification">
                <Dropdown.Toggle as={"a"} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media new">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img2.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          Congratulate <strong>Socrates Itumay</strong> for work
                          anniversaries
                        </p>
                        <span>Mar 15 12:32pm</span>
                      </div>
                    </div>
                    <div className="media new">
                      <div className="az-img-user online">
                        <img
                          src={require("../../assets/images/Defaultuse.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Joyce Chua</strong> just created a new blog
                          post
                        </p>
                        <span>Mar 13 04:16am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Althea Cabardo</strong> just created a new
                          blog post
                        </p>
                        <span>Mar 13 02:56am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../images/default.png")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Adrian Monino</strong> added new comment on
                          your photo
                        </p>
                        <span>Mar 12 10:40pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}

         <div/>
         <div className="ml-3"><a>{userInfo.name}</a></div>
              <Dropdown name="profil" className="az-profile-menu">
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  
                  <img
                    src={profilePic}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <div className="az-img-user">
                      <img
                       src={profilePic}
                      alt=""
                      ></img>
                    </div>
                    <h6>{NameInfo}</h6>
                    <span>{EmailInfo}</span>
                  </div>

                  <a href="/profil" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </a>
                  
                  
                  
                  <div className="dropdown-item">
                    <i className="typcn typcn-power-outline dropdown-item"></i>< Logout/>
                    </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
