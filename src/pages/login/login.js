import { useRef, useState, useReducer, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import useCounter from "../../hooks/use-counter";

const emailReducer = (state, action) => {
  if (action.type == "EMAIL_USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  } else if (action.type == "EMAIL_USER_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: undefined,
  };
};

const passwordReducer = (state, action) => {
  if (action.type == "PASSWORD_USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.length > 6,
    };
  }
  if (action.type == "PASSWORD_USER_BLUR") {
    console.log(state.value, state.value.length > 6);
    return {
      value: state.value,
      isvalid: state.value.length > 6,
    };
  }
  return {
    value: "",
    isValid: undefined,
  };
};
const Login = (props) => {
  const counter = useCounter(false);
  const ctx = useContext(AuthContext);
  console.log(ctx);
  const navigate = useNavigate();
  const configs = useSelector((state) => state.config.config);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //   const [enteredEmail, setEnteredEmail] = useState("");
  //   const [emailIsValid, setEmailIsValid] = useState();

  //   const [enteredPassword, setEnteredPassword] = useState("");
  //   const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const formSubmitHandler = async (evt) => {
    ctx.onLoggedIn(emailState.value, passwordState.value);
    evt.preventDefault();
    // return;
    setShowError(false);
    setErrorMsg("");
    const payLoad = {
      email: emailState.value,
      password: passwordState.value,
    };
    try {
      const loginResponse = await fetch(`${configs.USER}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(payLoad), // body data type must match "Content-Type" header
      });

      if (loginResponse.ok) {
        const response = await loginResponse.json();
        console.log(response);
        dispatch(LoginActions.setLoginState(true));
        localStorage.setItem("authToken", response.token);
        navigate("/add-fixtures");
      } else {
        const response = await loginResponse.json();
        setShowError(true);
        setErrorMsg(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEmailHandler = (evt) => {
    dispatchEmail({
      type: "EMAIL_USER_INPUT",
      value: evt.target.value,
    });
  };

  const validateEmailHandler = (evt) => {
    dispatch({ type: "EMAIL_USER_BLUR" });
  };

  const onChangePasswordHandler = (evt) => {
    dispatchPassword({
      value: evt.target.value,
      type: "PASSWORD_USER_INPUT",
    });
  };

  const validePasswordHandler = (evt) => {
    dispatchPassword({
      type: "PASSWORD_USER_BLUR",
    });
  };

  const { isValid: emailIsValid } = emailState;
  const { isValide: passwordIsValid } = emailState;
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [emailIsValid, passwordIsValid]);

  return (
    <section className="tg-main-section tg-haslayout">
      <div className="container">
        <div class="tg-section-name">
                  <h2>Admin Login {counter}</h2>
        </div>
        <div class="col-sm-11 col-xs-11 pull-right">
          {showError && (
            <div
              class="tg-posttitle"
              style={{ textTransform: "none", textAlign: "center" }}
            >
              <h3>
                <a href="#" style={{ color: "red" }}>
                  {errorMsg}
                </a>
              </h3>
            </div>
          )}
          <form
            onSubmit={formSubmitHandler}
            class="tg-commentform help-form"
            id="tg-commentform"
          >
            <div class="form-group">
              <input
                type="text"
                required=""
                placeholder="Enter your email"
                class="form-control"
                name="contact[name]"
                style={{ width: "100%", "margin-top": "20px" }}
                ref={emailRef}
                value={emailState.value}
                onChange={onChangeEmailHandler}
                onBlur={validateEmailHandler}
              />
              <input
                type="password"
                required=""
                placeholder="Enter your pasword"
                class="form-control"
                name="contact[name]"
                value={passwordState.value}
                style={{ width: "100%", "margin-top": "20px" }}
                ref={passwordRef}
                onChange={onChangePasswordHandler}
                onBlur={validePasswordHandler}
              />
              <div
                class="tg-btnsbox"
                style={{ float: "none", textAlign: "center" }}
              >
                <button type="submit" class="tg-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
