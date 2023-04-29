import React from 'react'


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      return (
        
          params.row.username
        
      );
    },
  },
  {
    field: "Description",
    headerName: "Description",
    width: 130,
  },
  {
    field: "UpadatedDate",
    headerName: "UpadatedDate",
    width: 160,
  },
  {
    field: "external_code",
    headerName: "external_code",
    width: 130,
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


  
  

];

//temporary data


  