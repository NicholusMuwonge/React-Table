import React, { Fragment, useEffect } from "react";
import axios from "axios";
import Table from "../Table/TableComponent";

const Content = () => {
  const [data, getfunction] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");

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
        const response = res.data;
        getfunction({ ...data, response });
      })
      .catch(err => console.log(err.res));
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h3>Pricing Details</h3>
        <input
          type="search"
          placeholder="Search here.."
          onChange={handleChange}
          value={searchTerm}
        />
        {Object.values(data).length > 0 ? (
          <Table data={!searchTerm ? data : results} />
        ) : (
          <p className="loader">Loading ...</p>
        )}
      </div>
    </Fragment>
  );
};

export default Content;
