import React from 'react'


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    width: 180,
    renderCell: (params) => {
      return (
        
          params.row.username
        
      );
    },
  },
  {
    field: "Description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "UpadatedDate",
    headerName: "UpadatedDate",
    width: 180,
  },

  {
    field: "Is_Active",
    headerName: "Is_Active",
    width: 160,
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


  