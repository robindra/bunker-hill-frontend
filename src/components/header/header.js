import { useContext } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
const Header = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => {
    return state.login;
  });
  const onLogout = (event) => {
    ctx.onLogout();
    event.preventDefault();
    localStorage.removeItem("authToken");
    dispatch(LoginActions.setLoginState(false));
    navigate("/login");
  };
  return (
    <>
      <header id="tg-header" class="tg-header tg-haslayout">
        <div class="container">
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div class="row">
              <div class="tg-topbar tg-haslayout">
                <nav id="tg-topaddnav" class="tg-topaddnav">
                  <div class="navbar-header">
                    <button
                      type="button"
                      class="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#tg-addnavigationm-mobile"
                    >
                      <i class="fa fa-arrow-right"></i>
                    </button>
                  </div>
                  <div
                    id="tg-addnavigationm-mobile"
                    class="tg-addnavigationm-mobile collapse navbar-collapse"
                  >
                    <div class="tg-colhalf pull-right">
                      <nav class="tg-addnav"></nav>
                    </div>
                    <div class="tg-colhalf">
                      <ul class="tg-socialicons"></ul>
                    </div>
                  </div>
                </nav>
              </div>
              <nav id="tg-nav" class="tg-nav brand-center">
                <div class="navbar-header">
                  <button
                    type="button"
                    class="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#tg-navigationm-mobile"
                  >
                    <i class="fa fa-bars"></i>
                  </button>
                  <strong class="tg-logo">
                    <a href="index-2.html">
                      <img src="images/logo.png" alt="image description" />
                    </a>
                  </strong>
                </div>
                <div id="tg-navigation" class="tg-navigation">
                  <div class="tg-colhalf">
                    <ul>
                      {/* <li>
                                <a href="#">Main</a>
                                <ul class="tg-dropdown-menu">
                                    <li><a href="index-2.html">home1</a></li>
                                    <li><a href="index2.html">home2</a></li>
                                </ul>
                            </li> */}
                      <li class="active">
                        <Link to="/teams">Team</Link>
                        {loginState.isLogin && (
                          <ul class="tg-dropdown-menu">
                            <li>
                              <Link to="/add-team">Add</Link>
                            </li>
                            <li>
                              <Link to="/add-player">Add Player</Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      {/* <li><a href="buyticket.html">Buy Tickets</a></li> */}
                      <li>
                        <Link to="/results">Match Results</Link>
                        {loginState.isLogin && (
                          <ul class="tg-dropdown-menu">
                            <li>
                              <Link to="/update-result">Update</Link>
                            </li>
                            {/* <li><a href="matchresultdetail.html">match result detail</a></li> */}
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div class="tg-colhalf">
                    <ul>
                      <li>
                        <Link to="/fixtures">fixtures</Link>
                        {loginState.isLogin && (
                          <ul class="tg-dropdown-menu">
                            <li>
                              <Link to="/add-fixtures">Add</Link>
                            </li>
                            {/* <li><a href="fixturedetail.html">Update</a></li> */}
                          </ul>
                        )}
                      </li>
                      {/* <li>
                                <a href="#">pro soccer media</a>
                                <ul class="tg-dropdown-menu">
                                    <li><a href="soccermedia-1.html">pro soccer media1</a></li>
                                    <li><a href="soccermedia-2.html">pro soccer media2</a></li>
                                </ul>
                            </li> */}
                      {!loginState.isLogin && (
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      )}
                      {loginState.isLogin && (
                        <li>
                          <a onClick={onLogout}>Logout</a>
                        </li>
                      )}
                      {/* <li>
                                <a href="#"><i class=" fa fa-navicon"></i></a>
                                <ul>
                                    <li><a href="aboutus.html">about us</a></li>
                                    <li><a href="shoplist.html">shop list</a></li>
                                    <li><a href="shopgrid.html">shop grid</a></li>
                                    <li><a href="productsingle.html">shop detail</a></li>
                                    <li><a href="bloglist.html">blog list</a></li>
                                    <li><a href="bloggrid.html">blog grid</a></li>
                                    <li><a href="blogdetail.html">blog detail</a></li>
                                    <li><a href="404.html">404 error</a></li>
                                    <li><a href="comming-soon.html">comming soon</a></li>
                                </ul>
                            </li> */}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      );
    </>
  );
};

export default Header;
