import React from "react";
import { normalizeCurrency, normaliseDate, compare } from "../Helper/Helper";

const Table = props => {
  const [isSorted, Sorter] = React.useState("no");
  var sortArray = s => {
    if (isSorted === "no") {
      return s;
    } else {
      const n = s.sort(compare);
      return n;
    }
  };

  const sortData = () => {
    const some = isSorted === "no" ? "yes" : "no";
    Sorter(some);
  };
  return (
    <table className="table table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">
            <i className="fa fa-sort" onClick={sortData}></i>Project
          </th>
          <th scope="col">Description </th>
          <th scope="col">Start Date</th>
          <th scope="col">Category</th>
          <th scope="col">Responsible</th>
          <th scope="col">Savings Amount</th>
          <th scope="col">Currency</th>
          <th scope="col">Complexity</th>
        </tr>
      </thead>
      <tbody>
        {props.data
          ? Object.values(props.data).map(s =>
              Object.values(sortArray(s)).map((n, key) => (
                <tr key={key}>
                  <td>{n.project}</td>
                  <td>{n.description}</td>
                  <td>{normaliseDate(n["start date"])}</td>
                  <td>{n.category}</td>
                  <td>{n.responsible}</td>
                  <td>{parseInt(n["savings amount"])}</td>
                  <td>{normalizeCurrency(n.currency)}</td>
                  <td>{n.complexity}</td>
                </tr>
              ))
            )
          : []}
      </tbody>
    </table>
  );
};

export default Table;
