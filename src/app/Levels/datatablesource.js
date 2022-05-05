 import axios from 'axios';
import React, {useEffect,useState} from 'react'


//  const [viewLevels,setLevels] = useState([]);
//    useEffect(()=>{
//       axios.get('/api/Levels').then(res=>{
//         if(res.data.status ===200)
//         {
//           setLevels(res.data.Levels);

//         }
//       });

//  },[]);

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },


];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },

  // viewLevels.map( (item) =>{
  //   return{
      
  //         id: 1,
  //         username: "ll",
  //         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //         status: "active",
  //         email: "1snow@gmail.com",
  //         age: 35,
      
  //   }
  //   })


  
];
