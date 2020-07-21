import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/container/TourContainerComponent";

function SignUpPage({ location }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Sign Up",
    },
  ];

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
    {
      id: "password_confirmation",
      type: "password",
    },
    {
      id: "phone_number",
      type: "number",
    },
    {
      id: "account_name",
    },
    {
      id: "account_number",
      type: "number",
      required: false,
    },
    {
      id: "bank_name",
      required: false,
    },
    {
      id: "country",
      required: false,
    },
    {
      id: "state",
      required: false,
    },
    {
      id: "address",
      required: false,
    },
  ];

  const onSubmit = (body) => {
    callBack("/api/users", "UPDATE_USER", body);
  };

  const params = new URLSearchParams(location.search);
  const refid = params.get("refid");

  const initialState = {
    user_id: refid || null,
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="row app-my-3 ">
        <div className="col s12 m12 l6 offset-l3">
          <div className="card-panel center">
            <ul className="stepper linear ">
              <li className="step active">
                <div className="step-title">Account Information</div>
                <p>Fields marked with * are required</p>
                {refid && <p>You are signing up via a referral link</p>}
                <div className="step-content">
                  <Form
                    {...{
                      formArray,
                      fetching,
                      errors,
                      message,
                      onSubmit,
                      text: "Sign Up",
                      initialState,
                    }}
                  />
                </div>
              </li>

              <li className="step">
                <div className="step-title">Email Verification</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default SignUpPage;
