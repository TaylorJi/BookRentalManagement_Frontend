// import React, {useState, useEffect} from "react";
// import axios from "axios";
// import { response } from "express";


// interface Type {
//     _id: string;
//     name: string;
//     fee: number;
//     duration: number
//     late_fee: number
// };


// const TypeList: React.FC = () => {
//     const [TypeList, setTypeList] = useState<Type[]>([]);

//     const fetchTypes = () => {
//         axios.get("/api/types")
//         .then(response => {
//             console.log("response.data:", response.data);
//             setTypeList(response.data);
        
//         })
//         .catch(error => console.error('Error:', error));
//     }


//     useEffect(() => {
//         fetchTypes();
//     }, []);

//     return (
//         <div>
//             <h2>Types</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Fee</th>
//                         <th>Duration</th>
//                         <th>Late fee</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {TypeList.map(g => (
//                         <tr key={g._id}>
//                             <td>{g.name}</td>
//                             <td>{g.fee}</td>
//                             <td>{g.duration}</td>
//                             <td>{g.late_fee}</td>
//                             <td>
//                                 <button>Edit</button>
//                                 <button>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>


//         </div>
//     );
// }

// export default TypeList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Container } from "@mui/material";

interface Type {
  _id: string;
  name: string;
  fee: number;
  duration: number;
  late_fee: number;
}

const TypeList: React.FC = () => {
  const [typeList, setTypeList] = useState<Type[]>([]);

  const fetchTypes = () => {
    axios
      .get("/api/types")
      .then((response) => {
        console.log("response.data:", response.data);
        setTypeList(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Types
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Late Fee</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeList.map((type) => (
              <TableRow key={type._id}>
                <TableCell>{type.name}</TableCell>
                <TableCell>{type.fee}</TableCell>
                <TableCell>{type.duration}</TableCell>
                <TableCell>{type.late_fee}</TableCell>
                <TableCell>
               
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TypeList;



