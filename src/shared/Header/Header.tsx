import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { MenuItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';

const Header = () => {
  return (
    <header>
      <Box sx={styles.filler} />
      <Box sx={styles.headerWrapper}>
        <Container sx={styles.header} maxWidth="lg">
          <Stack direction="row">
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/remixes">Remixes</Link>
            </MenuItem>
          </Stack>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
