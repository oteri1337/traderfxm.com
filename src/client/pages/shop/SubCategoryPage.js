import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import ErrorPage from "../tour/ErrorPage";
import { getRequestThenDispatch } from "hooks";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";
import ContainerComponent from "components/container/TourContainerComponent";

function CategoryReadPage({ match }) {
  const { slug, sub } = match.params;
  const dispatch = "UPDATE_GROUP";
  const { state, callReducer } = getRequestThenDispatch(
    `/api/groups/${sub}`,
    dispatch
  );

  const parent = state.parentgroups.object[slug];

  if (!parent) {
    return <ErrorPage />;
  }

  const data = state.groups.object[sub];
  const array = data.products;

  const nav = [
    {
      label: "Categories",
      link: "/shop/categories/list.html",
    },
    {
      label: parent.name,
      link: `/shop/categories/${parent.slug}`,
    },
    {
      label: data.name,
    },
  ];

  const callback = function (props) {
    const renderCartButton = (data) => {
      if (state.cart[data.id]) {
        //prettier-ignore
        return <a onClick={() => {callReducer({ dispatch: "REMOVE_FROM_CART", data });}}>
          Remove from cart
        </a>
      }

      return (
        //prettier-ignore
        <a onClick={() => {callReducer({ dispatch: "ADD_TO_CART", data });}}>
          Add to cart
        </a>
      );
    };
    return (
      <div className="col l4 m4 s6" key={props.id}>
        <div className="card medium animated fadeInUp">
          <div className="card-image">
            <img src={`/uploads/images/${props.image_one}`} />
          </div>
          <div className="card-content">
            <center>
              <Link
                to={{ pathname: `/shop/products/${props.slug}`, props }}
                style={{ fontSize: "25px" }}
              >
                {props.title}
              </Link>
              <br />
              <p>{format("NGN", props.price)}</p>
            </center>
          </div>
          <div className="card-action" style={{ fontSize: "1rem" }}>
            <center>
              {renderCartButton(props)}
              <Link to="/shop/cart.html" className="waves-effect">
                View Cart
              </Link>
            </center>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="container row">
        <br />
        <ListComponent {...{ array, callback }} />
      </div>
    </ContainerComponent>
  );
}

export default CategoryReadPage;
