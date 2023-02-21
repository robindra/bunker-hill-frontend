import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/normalize.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/transitions.css";
import "./assets/css/prettyPhoto.css";
import "./assets/css/swiper.min.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/animate.css";
import "./assets/css/owl.theme.css";
import "./assets/css/owl.carousel.css";
import "./assets/css/customScrollbar.css";
import "./assets/css/icomoon.css";
import "./assets/css/main.css";
import "./assets/css/color.css";
import "./assets/css/responsive.css";

import { AuthContextProvider } from "./context/auth-context";
import Header from "./components/header/header";
import Banner from "./components/header/banner";
import Players from "./pages/palyers/players";
import Category from "./pages/category/category";
import Results from "./pages/results/result";
import Teams from "./pages/teams/team";
import Fixtures from "./pages/fixtures/fixtures";
import AddFixtures from "./pages/fixtures/add";
import Footer from "./components/footer/footer";

import { configActions } from "./store/config-slice";
import AddTeam from "./pages/teams/add";
import UpdateResults from "./pages/results/update";
import Login from "./pages/login/login";
import TeamDetail from "./pages/teams/view";
import AddPlayer from "./pages/palyers/add";

function App() {
  const dipatch = useDispatch();
  // const loginState = {};
  // const loginState = useSelector(state => {
  //   return state.login;
  // });
  // console.log('loginState', loginState)
  const onLoginHandler = () => {
    console.log('on login handler ');
  }
  const onLogoutHandler = () => {
    console.log('on logut handler');
  }
  const getConfigs = async () => {
    try {
      const configs = await fetch("http://localhost:5001/api/v1/configs");
      if (configs.ok) {
        const data = await configs.json();
        console.log(data);
        dipatch(configActions.updateConfigs(data.data));
      }
    } catch (error) {}
  };
  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <>
        {/* <!--************************************
            Wrapper Start
        *************************************--> */}
        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
          {/* <!--************************************
              Header Start
          *************************************--> */}
          <Header />
          {/* <!--************************************
              Header End
          *************************************--> */}
          {/* <!--************************************
              Banner Start
          *************************************--> */}
          <Banner />
          {/* <!--************************************
              Banner End
          *************************************--> */}
          {/* <!--************************************
              Main Start
          *************************************--> */}
          <main id="tg-main" class="tg-main tg-haslayout">
            <Routes>
              <Route path="/" exact element={<Fixtures />} />

              <Route path="/players" element={<Players />} />
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/add-fixtures" element={<AddFixtures />} />

              <Route path="/teams" element={<Teams />} />
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/team-detail/:teamId" element={<TeamDetail />} />
              <Route path="/add-player" element={<AddPlayer />} />

              <Route path="/category" element={<Category />} />
              <Route path="/results" element={<Results />} />
              <Route path="/update-result" element={<UpdateResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* <!--************************************
                Testimonials End
            *************************************--> */}
          </main>
          {/* <Footer />           */}
        </div>
    </>
  );
}

export default App;
