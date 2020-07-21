import React from "react";

const TableComponent = ({ data = {} }) => {
  let keysArray = Object.keys(data);

  const rows = keysArray.map((key) => {
    if (typeof data[key] === "object") {
      return false;
    }

    return (
      <tr key={key}>
        <td style={{ textTransform: "uppercase" }}>{key.replace(/_/g, " ")}</td>
        <td>{data[key]}</td>
      </tr>
    );
  });

  return (
    <table className="striped">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableComponent;
