import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";
import ContainerComponent from "components/container/TourContainerComponent";

function CategoryListPage() {
  const { state, getRequestThenDispatch } = React.useContext(AppContext);

  getRequestThenDispatch("/api/groups", "UPDATE_GROUPS");

  const list = state.groups;

  const nav = [
    {
      label: "Shop",
      link: "/shop/products.html",
    },
    {
      label: "Categories",
    },
  ];

  const callback = (item) => {
    return (
      <li className="collection-item" key={item.id}>
        <Link to={`/shop/categories/${item.slug}`}>{item.name}</Link>
      </li>
    );
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="container">
        <br />
        <ListComponent {...{ list, callback }} />
      </div>
    </ContainerComponent>
  );
}

export default CategoryListPage;
