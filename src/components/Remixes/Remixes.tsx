import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import {
  Checkbox,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import formatMoney from '@/utils/formatMoney';
import formatTime from '@/utils/formatTime';

interface IRemixes {
  id: number;
  name: string;
  authorEmail: string;
  genre: number;
  description: string;
  price: number;
  trackLength: number;
  isStore: boolean;
}

type TRules = 'price' | 'length' | 'desc' | 'email' | null;

const remixes: IRemixes[] = [
  {
    id: 0,
    name: 'Ahduas jdasuhik',
    authorEmail: 'daso@hduias.com',
    genre: 0,
    description: 'A good one',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: true
  },
  {
    id: 1,
    name: 'test',
    authorEmail: 'dhuais@dhuas.com',
    genre: 1,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: false
  },
  {
    id: 2,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 2,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: false
  },
  {
    id: 3,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 3,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: false
  },
  {
    id: 4,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 4,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: true
  },
  {
    id: 5,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 0,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: true
  },
  {
    id: 6,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 1,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: false
  },
  {
    id: 7,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 2,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: false
  },
  {
    id: 8,
    name: 'test',
    authorEmail: 'duasihda@djaoiss.com',
    genre: 3,
    description: '',
    price: Math.random() * 100,
    trackLength: Math.random() * 300,
    isStore: true
  }
];

const genreMap: string[] = ['Trap', 'Hip Hop', 'Rock', 'Pop', 'Jazz'];

function tableHead(name: string) {
  return (
    <TableCell>
      <TableSortLabel>{name}</TableSortLabel>
    </TableCell>
  );
}

function validateField(field: any, rule: TRules) {
  if (!field.value) return false;

  if (rule == 'length') {
    const value = parseInt(field.value, 10);
    if (value > 300 || value < 0) return false;
  }

  if (rule == 'price') {
    let value = field.value.replace(',', '.');
    value = parseFloat(value);

    if (value < 0 || value > 1000) return false;
  }

  if (rule == 'desc') {
    if (field.value.length > 500) return false;
  }

  if (rule == 'email') {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(field.value)) return false;
  }

  return true;
}

const Remixes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allRemixes, setAllRemixes] = useState(remixes);
  const [addingNewOne, setAddingNewOne] = useState(false);

  const [newGenre, setNewGenre] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [positionEditing, setPositionEditing] = useState(0);
  const [remixEditing, setRemixEditing] = useState<IRemixes>({
    id: 0,
    name: '',
    authorEmail: '',
    genre: 0,
    description: '',
    price: 0,
    trackLength: 0,
    isStore: false
  });

  const [errorsForm, setErrorsForm] = useState({
    name: false,
    author: false,
    genre: false,
    desc: false,
    price: false,
    length: false,
    available: false
  });

  const buildTime = (length: number) => {
    return `${formatTime(length).minutes}m 
    ${formatTime(length).seconds}s`;
  };

  const buildMoney = (price: number) => {
    return formatMoney(price);
  };

  function newRemix() {
    const newErrorForm = {
      name: false,
      author: false,
      genre: false,
      desc: false,
      price: false,
      length: false,
      available: false
    };
    let haveError = false;

    const remixname: any = document.querySelector('#remix-name');
    if (!remixname || !validateField(remixname, null)) {
      newErrorForm.name = true;
      haveError = true;
    }

    const remixauthor: any = document.querySelector('#remix-author');
    if (!remixauthor || !validateField(remixauthor, 'email')) {
      newErrorForm.author = true;
      haveError = true;
    }

    const remixdesc: any = document.querySelector('#remix-desc');
    if (!remixdesc || !validateField(remixdesc, 'desc')) {
      newErrorForm.desc = true;
      haveError = true;
    }

    const remixprice: any = document.querySelector('#remix-price');
    if (!remixprice || !validateField(remixprice, 'price')) {
      newErrorForm.price = true;
      haveError = true;
    }

    const remixlength: any = document.querySelector('#remix-length');
    if (!remixlength || !validateField(remixlength, 'length')) {
      newErrorForm.length = true;
      haveError = true;
    }

    const remixavailable: any = document.querySelector('#remix-available');
    if (!remixavailable || !validateField(remixavailable, null)) {
      newErrorForm.available = true;
      haveError = true;
    }

    if (haveError === true) return setErrorsForm(newErrorForm);
    setErrorsForm(newErrorForm);

    const newRemixJson: IRemixes = {
      id: allRemixes.length + 1,
      name: remixname?.value,
      authorEmail: remixauthor?.value,
      genre: newGenre,
      description: remixdesc?.value,
      price: parseFloat(remixprice.value.replace(',', '.')),
      trackLength: parseInt(remixlength.value, 10),
      isStore: remixavailable?.value == 'on'
    };

    const newList = allRemixes;
    newList.unshift(newRemixJson);
    setAllRemixes(newList);

    setAddingNewOne(false);
    remixname.value = null;
    remixauthor.value = null;
    remixdesc.value = null;
    remixprice.value = null;
    remixlength.value = null;
    remixavailable.value = null;
    setNewGenre(0);

    return true;
  }

  function deleteRemix(position: number) {
    const newList = JSON.parse(JSON.stringify(allRemixes));
    newList.splice(position, 1);
    setAllRemixes(newList);
  }

  function editRemix(position: number, finishEdit: boolean) {
    if (finishEdit) {
      const newList = allRemixes;
      newList[position] = remixEditing;
      newList[position].genre = newGenre;
      setAllRemixes(newList);
    } else {
      setPositionEditing(position);
      setRemixEditing(allRemixes[position]);
      setNewGenre(allRemixes[position].genre);
    }

    setIsEditing(!finishEdit);
  }

  return (
    <Box style={{ marginTop: '50px' }}>
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHead('Name')}
                  {tableHead('Author')}
                  {tableHead('Genre')}
                  {tableHead('Description')}
                  {tableHead('Price')}
                  {tableHead('Length')}
                  {tableHead('Available')}
                  {tableHead('Actions')}
                </TableRow>
              </TableHead>

              <TableBody>
                {allRemixes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((remix, index) => {
                    return (
                      <TableRow key={remix.id}>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <TextField
                              error={errorsForm.name}
                              id="remix-name"
                              label="Name"
                              variant="standard"
                              defaultValue={remixEditing.name}
                              onInput={(e: any) =>
                                setRemixEditing({ ...remixEditing, name: e.target.value })
                              }
                              required
                            />
                          ) : (
                            remix.name
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <TextField
                              error={errorsForm.author}
                              id="remix-author"
                              label="Author"
                              variant="standard"
                              defaultValue={remixEditing.authorEmail}
                              onInput={(e: any) =>
                                setRemixEditing({ ...remixEditing, authorEmail: e.target.value })
                              }
                              required
                            />
                          ) : (
                            remix.authorEmail
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <Select
                              labelId="remix-genre-label"
                              id="remix-genre"
                              value={newGenre}
                              onChange={(e) => setNewGenre(e.target.value as number)}
                            >
                              {genreMap.map((genre, index) => {
                                return (
                                  <MenuItem value={index} key={genre}>
                                    {genre}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          ) : (
                            genreMap[remix.genre]
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <TextField
                              error={errorsForm.desc}
                              id="remix-desc"
                              label="Description"
                              variant="standard"
                              defaultValue={remixEditing.description}
                              onInput={(e: any) =>
                                setRemixEditing({ ...remixEditing, description: e.target.value })
                              }
                              required
                            />
                          ) : (
                            remix.description
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <TextField
                              error={errorsForm.price}
                              id="remix-price"
                              label="Price"
                              variant="standard"
                              defaultValue={formatMoney(remixEditing.price)}
                              onInput={(e: any) =>
                                setRemixEditing({ ...remixEditing, price: e.target.value })
                              }
                              required
                            />
                          ) : (
                            buildMoney(remix.price)
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <TextField
                              error={errorsForm.author}
                              id="remix-author"
                              label="Length"
                              variant="standard"
                              defaultValue={remixEditing.trackLength}
                              onInput={(e: any) =>
                                setRemixEditing({ ...remixEditing, trackLength: e.target.value })
                              }
                              required
                            />
                          ) : (
                            buildTime(remix.trackLength)
                          )}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            checked={
                              isEditing && positionEditing == index
                                ? remixEditing.isStore
                                : remix.isStore
                            }
                            onInput={(e: any) =>
                              setRemixEditing({ ...remixEditing, isStore: e.target.checked })
                            }
                            disabled={!(isEditing && positionEditing == index)}
                            inputProps={{
                              'aria-labelledby': remix.name
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {isEditing && positionEditing == index ? (
                            <SaveIcon onClick={() => editRemix(index, true)} />
                          ) : (
                            <EditIcon onClick={() => editRemix(index, false)} />
                          )}
                          <DeleteForeverIcon onClick={() => deleteRemix(index)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {addingNewOne && (
                  <TableRow>
                    <TableCell>
                      <TextField
                        error={errorsForm.name}
                        id="remix-name"
                        label="Name"
                        variant="standard"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        error={errorsForm.author}
                        id="remix-author"
                        label="Author"
                        variant="standard"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <InputLabel id="remix-genre-label">Genre</InputLabel>
                      <Select
                        labelId="remix-genre-label"
                        id="remix-genre"
                        label="Genre"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value as number)}
                      >
                        {genreMap.map((genre, index) => {
                          return (
                            <MenuItem value={index} key={genre}>
                              {genre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        error={errorsForm.desc}
                        id="remix-desc"
                        label="Description"
                        variant="standard"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        error={errorsForm.price}
                        id="remix-price"
                        label="Price"
                        variant="standard"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        error={errorsForm.length}
                        id="remix-length"
                        label="Music Lenght"
                        variant="standard"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox id="remix-available" name="remixAvailable" />
                    </TableCell>
                    <TableCell>
                      <SaveIcon onClick={() => newRemix()} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <AddIcon onClick={() => setAddingNewOne(!addingNewOne)} />

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={remixes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Remixes;
