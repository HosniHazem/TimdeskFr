import React from 'react'


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "Organization",
    headerName: "Organization",
    width: 130,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "Role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "UpadatedDate",
    headerName: "UpadatedDate",
    width: 130,
  },

  {
    field: "Is_Active",
    headerName: "Is_Active",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Is_Active}`}>
          {params.row.Is_Active}
        </div>
      );
    },
  },
];

//temporary data


  