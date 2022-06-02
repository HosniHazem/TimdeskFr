import React from 'react'


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "Organization",
    headerName: "Organization",
    width: 130,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 130,
  },
  {
    field: "Role",
    headerName: "Role",
    width: 130,
  },
  {
    field: "UpadatedDate",
    headerName: "UpadatedDate",
    width: 180,
  },

  {
    field: "Is_Active",
    headerName: "Is_Active",
    width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Is_Active}`}>
          {params.row.Is_Active}
        </div>
      );
    },
  },
  {
    field: "Solde",
    headerName: "Solde",
    width: 130,
  },
];

//temporary data


  