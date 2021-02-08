import { ReactElement } from 'react';
// Components
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
// MUI
import {
  CircularProgress,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// Inteface
import { PokemonsData } from '../App';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      margin: `${theme.spacing(10)}px 0`,
      padding: `0 ${theme.spacing(2)}px`,
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacing(4)}px`,
      },
    },
    grid: {
      display: 'grid',
      gridGap: theme.spacing(8),
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.up(1400)]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [theme.breakpoints.up(1800)]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    fetchError: {
      color: theme.palette.error.main,
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
    buttonWrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    topContainer: {
      marginBottom: theme.spacing(3),
    },
    formControl: {
      minWidth: 120,
    },
  })
);

interface Props {
  pokemonQuery: string;
  setPokemonQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchLoading: boolean;
  pokemons: PokemonsData[];
  handleFetchMorePokemons: () => Promise<void>;
  isFetchingMore: boolean;
  fetchError: any;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export default function Home(props: Props): ReactElement {
  const {
    pokemonQuery,
    setPokemonQuery,
    fetchLoading,
    pokemons,
    handleFetchMorePokemons,
    isFetchingMore,
    fetchError,
    limit,
    setLimit,
    setOffset,
  } = props;
  const classes = useStyles();

  const handlePokemonsPerPage = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(e.target.value as number);
    setOffset(e.target.value as number);
  };
  return (
    <>
      <Header pokemonQuery={pokemonQuery} setPokemonQuery={setPokemonQuery} />
      <div className={classes.container}>
        {fetchLoading ? (
          <CircularProgress />
        ) : fetchError ? (
          <Typography className={classes.fetchError} variant='subtitle1'>
            Ooops, somethind went wrong. Couldn't fetch pokemons. Try refreshing
            page!
          </Typography>
        ) : (
          <>
            <div className={classes.topContainer}>
              <FormControl className={classes.formControl}>
                <InputLabel id='pokemonPerLoad-label'>
                  Pokemons limit
                </InputLabel>
                <Select
                  labelId='pokemonPerLoad-label'
                  id='pokemonPerPageSelect'
                  value={limit}
                  onChange={handlePokemonsPerPage}
                >
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                  <MenuItem value={64}>64</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.grid}>
              {pokemons.map((item, i) => (
                <PokemonCard key={i} name={item.name} />
              ))}
            </div>
            {pokemonQuery === '' && (
              <div className={classes.wrapper}>
                <div className={classes.buttonWrapper}>
                  <Button
                    variant='contained'
                    onClick={handleFetchMorePokemons}
                    disabled={isFetchingMore}
                  >
                    Load more
                  </Button>
                  {isFetchingMore && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                      color='secondary'
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
