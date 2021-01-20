import React, { Fragment } from "react";
import PaginationComponent from "./PaginationComponent";
import ListDefaultComponent from "./ListDefaultComponent";

function ListComponent(props) {
  const list = props.list || {};

  const data = list.array || props.array || [];

  const dispatch = props.dispatch || "";
  const fetching = props.fetching || false;
  const empty = props.empty || "No Data Found";

  const renderSpinner = () => {
    if (fetching) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  if (data.length === 0) {
    return (
      <Fragment>
        {renderSpinner()}
        <ul className="collection">
          <li className="collection-item">
            <p id="no-data" style={{ textAlign: "center" }}>
              {!fetching && <span>{empty}</span>}
            </p>
          </li>
        </ul>
      </Fragment>
    );
  }

  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  const renderList = () => {
    if (typeof data != "object") {
      return null;
    }

    const list_items = data?.map(callback);

    if (props.style == "none") {
      return list_items;
    }

    return <ul className="collection">{list_items}</ul>;
  };

  return (
    <Fragment>
      {renderSpinner()}
      {renderList()}
      <PaginationComponent list={list} dispatch={dispatch + "_PAGE"} />
    </Fragment>
  );
}

export default ListComponent;
