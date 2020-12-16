import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function CancelTransactionComponent({ id, status }) {
  const { callBack, request } = sendRequestThenDispatch();
  const { fetching } = request;

  const text = "Cancel Transaction";

  const initialState = { id, status: 3 };

  const onSubmit = (body) => {
    const sure = confirm("are you sure you want to CANCEL?");

    if (sure) {
      const url = `/api/nairatransactions`;

      callBack(url, "UPDATE_NAIRATRANSACTION", body, null, "PATCH");
    }
  };

  const className = "red btn";

  return (
    <FormComponent
      {...{
        text,
        initialState,
        onSubmit,
        fetching,
        className,
      }}
    />
  );
}

export default CancelTransactionComponent;
