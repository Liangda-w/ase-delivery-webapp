import React from "react";
import { Redirect } from "react-router-dom";
// FORM-LOGIC
import { useForm, SubmitHandler } from "react-hook-form";

// REDUX
import { setUser, getCurrentUser } from "../../app/state/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/state/hooks/userHook";

// ASSETS
import "../../assets/css/LogIn.css";
import DeliveryTruck from "../../assets/img/delivery2.png";

// UI-ELEMENTS
import {
  Col,
  Row,
  Container,
  Button,
  Input,
  Typography,
} from "../../components";

// INTERACES
import { ILogInForm } from "./ILogInForm";

// API CALLS
import { authenticate } from "../../api";

export const StartScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register: registerLogIn,
    handleSubmit: handleSubmitLogIn,
    formState: { errors: errorsLogIn },
    reset: resetLogIn,
  } = useForm<ILogInForm>();

  const user = useAppSelector(getCurrentUser);
  const onLogInSubmit: SubmitHandler<ILogInForm> = (data) => {
    authenticate(data.email, data.password).then((response) => {
      if (response) {
        dispatch(
          setUser({
            username: response.username,
            email: response.email,
            id: response.id,
            password: response.password,
            roles: response.roles,
          })
        );
      }
    });
    resetLogIn();
  };

  return (
    <div>
      {user ? <Redirect to="/dashboard" /> : ""}
      <Container fluid classes="p-0">
        <Row classes="g-0">
          <Col classes="col-xl-9 background-secondary">
            <div
              className="pt-lg-5 p-4 justify-content-center d-flex flex-column"
              style={{ height: "100vh" }}
            >
              <div className="w-100">
                <div className="d-flex flex-column align-items-center">
                  <img src={DeliveryTruck} alt="Logo" className="w-25" />
                  <Typography variant="h1" color="dark" classes="fst-italic">
                    ASEDelivery
                  </Typography>
                </div>
                <div className="d-flex flex-column">
                  <div className="p-4 mt-auto">
                    <Row classes="justify-content-center">
                      <Col classes="col-lg-7">
                        <div className="text-center">
                          <Typography variant="h4" color="white" classes="mb-3">
                            Bringing more than 500 smiles per day with our
                            deliveries.
                          </Typography>
                          <Typography variant="p" color="muted">
                            Stop picking up your parcels from your neighbours.
                            Pick them up from your new pick up box instead!
                          </Typography>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col classes="col-xl-3">
            <div className="p-md-5 p-4">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5">
                    <div>
                      <Typography variant="h5" color="primary">
                        Welcome back!
                      </Typography>
                      <Typography variant="p" classes="text-muted">
                        Sign in to continue.
                      </Typography>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmitLogIn(onLogInSubmit)}
                    className="mb-5"
                  >
                    <Input
                      type="text"
                      register={registerLogIn}
                      formKey="email"
                      label="E-Mail or Username"
                      errors={{
                        required: {
                          value: true,
                        },
                        minLength: {
                          value: 1,
                          message: "Please provide a valid input.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Please provide a valid input.",
                        },
                      }}
                      isValid={errorsLogIn.email === undefined}
                      invalidFeedback={errorsLogIn.email?.message}
                      wrapperClasses="mb-3"
                    />
                    <Input
                      type="password"
                      register={registerLogIn}
                      formKey="password"
                      label="Password"
                      errors={{
                        required: {
                          value: true,
                          message: "This is a required field.",
                        },
                      }}
                      isValid={errorsLogIn.password === undefined}
                      wrapperClasses="mb-3"
                      invalidFeedback={errorsLogIn.password?.message}
                    />
                    <div className="mt-3 d-grid">
                      <Button htmlType="submit">Log In</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
