import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const FakeData = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="fake data table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Identifier</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.identifier}>
              <TableCell>{record.index}</TableCell>
              <TableCell>{record.identifier}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.address}</TableCell>
              <TableCell>{record.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FakeData;
