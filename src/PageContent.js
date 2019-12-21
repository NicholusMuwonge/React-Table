import React, { Fragment, useEffect } from "react";
import axios from "axios";
import sort from "./images/sort.svg";

export var tr = (n, normaliseDate, normalizeCurrency, key) => (
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
);

export const normalizeCurrency = currency => {
  if (currency === "NULL") {
    return "";
  } else {
    return currency;
  }
};

export var compare = (a, b) => {
  let comparison = 0;
  if (a.project > b.project) {
    comparison = 1;
  } else if (a.project < b.project) {
    comparison = -1;
  }
  return comparison;
};

export var normaliseDate = date => {
  const old_date = new Date(date);
  const new_date = old_date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return new_date.replace(/[/]/g, ".");
};


const Content = () => {
  const [data, getfunction] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSorted, Sorter] = React.useState("no");


  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  var results = !searchTerm
    ? []
    : Object.values(data).map(m =>
        m.filter(person =>
          person.description
            .toLowerCase()
            .includes(searchTerm.trim().toLocaleLowerCase())
        )
      );


  const getdataUrl =
    "https://sievo-react-assignment.azurewebsites.net/api/data";

  useEffect(() => {
    axios
      .get(getdataUrl)
      .then(res => {
        const some = res.data;
        getfunction({ ...data, some });
      })
      .catch(err => console.log(err.res));
  }, []);

  const sortArray = s => {
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
    <Fragment>
      {data.isArray && data.length === 0 ? (
        <p
          style={{
            marginLeft: "35rem",
            marginTop: "15rem",
            fontSize: "2rem",
            color: "grey"
          }}
        >
          Loading...
        </p>
      ) : (
        <div className="container">
          <h3>Pricing Details</h3>
          <input
            type="search"
            placeholder="Search here.."
            onChange={handleChange}
            value={searchTerm}
          />
          <img
            src={sort}
            alt=""
            style={{
              height: "1.4rem",
              marginLeft: "10px",
              cursor: "pointer"
            }}
            onClick={sortData}
          />
          {Object.values(data).length>0?
          <table className="table table-responsive-sm">
            <thead>
              <tr>
                <th scope="col"><i class="fa fa-sort" onClick={sortData}></i>Project</th>
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
              {!searchTerm
                ? Object.values(data).map(s =>
                    Object.values(sortArray(s)).map((n, key) =>
                      tr(n, normaliseDate, normalizeCurrency, key)
                    )
                  )
                : Object.values(results).map(s =>
                    Object.values(s).map((n, key) =>
                      tr(n, normaliseDate, normalizeCurrency, key)
                    )
                  )}
            </tbody>
          </table>: <p className="loader">Loading ...</p>}
        </div>
      )}
    </Fragment>
  );
};

export default Content;
