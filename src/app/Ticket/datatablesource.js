
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Sujet",
    headerName: "Sujet",
    width: 100,
    renderCell: (params) => {
      return (
        
          params.row.username
        
      );
    },
  },
  {
    field: "Status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "Applicant",
    headerName: "Applicant",
    width: 160,
  },
  {
    field: "AssignedUser",
    headerName: "AssignedUser",
    width: 130,
  },
  {
    field: "CreatedDate",
    headerName: "CreatedDate",
    width: 130,
  },
  {
    field: "DueDate",
    headerName: "DueDate",
    width: 130,
  },
];

//temporary data


  