import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from './RecordsTable.module.css';
import { Record } from '../../Interfaces/interfaces';

const RecordsTable: React.FC<{ records: Record[] }> = ({ records }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.title}</TableCell>
                <TableCell>{record.description || "N/A"}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.range}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default RecordsTable;