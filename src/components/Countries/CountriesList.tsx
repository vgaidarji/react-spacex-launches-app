import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import { Countries } from "../../types/Countries";
import { GET_COUNTRIES } from './countriesGqlQuery';
import { useQuery } from "@apollo/react-hooks";
import { Country } from "../../types/Country";

const CountriesList: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<Countries>(GET_COUNTRIES);
  
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    
    function handleCountryClick(countr: Country) {
      navigate("/country");
    }

    const countriesList = data?.countries.map((item : Country) =>
        <StyledTableRow key={item.name} onClick={() => handleCountryClick(item)}>
            <StyledTableCell component="th" scope="row">
                {item.name}
            </StyledTableCell>
            <StyledTableCell align="right">{item.capital}</StyledTableCell>
            <StyledTableCell align="right">{item.code}</StyledTableCell>
            <StyledTableCell align="right">{item.emoji}</StyledTableCell>
        </StyledTableRow>
    )
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Capital</StyledTableCell>
                        <StyledTableCell align="right">Code</StyledTableCell>
                        <StyledTableCell align="right">Emoji</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesList}
                </TableBody>
            </Table>
        </TableContainer>
      )
}

export default CountriesList;