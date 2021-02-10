import { ReactElement } from 'react';
// MUI
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
// MUI icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      flexGrow: 1,
    },
    searchContainer: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    searchIconContainer: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'grid',
      placeItems: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  })
);

interface Props {
  pokemonQuery: string;
  setPokemonQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchPokemon: () => Promise<void>;
}

export default function Header(props: Props): ReactElement {
  const classes = useStyles();

  const { pokemonQuery, setPokemonQuery, handleSearchPokemon } = props;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {
      target: { value },
    } = e;
    setPokemonQuery(value);
  };
  return (
    <AppBar position='static' classes={{ root: classes.root }}>
      <Toolbar>
        <Typography className={classes.title} variant='h6' noWrap>
          Pokédex
        </Typography>
        <div className={classes.searchContainer}>
          <div className={classes.searchIconContainer}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search pokemon...'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search pokemon' }}
            value={pokemonQuery}
            onChange={handleSearch}
            type='text'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchPokemon();
              }
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
