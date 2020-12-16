import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function CompleteTransactionComponent({ id, status }) {
  const { callBack, request } = sendRequestThenDispatch();
  const { fetching } = request;

  const text = "Complete Transaction";

  const initialState = { id, status: 2 };

  const onSubmit = (body) => {
    const sure = confirm("are you sure you want to COMPLETE?");

    if (sure) {
      const url = `/api/nairatransactions`;

      callBack(url, "UPDATE_NAIRATRANSACTION", body, null, "PATCH");
    }
  };

  return (
    <FormComponent
      {...{
        text,
        initialState,
        onSubmit,
        fetching,
      }}
    />
  );
}

export default CompleteTransactionComponent;
