import React from "react";
const Table = ({ rows, columns }) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          {columns.map(column => (
            <th scope="col" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.totalCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
