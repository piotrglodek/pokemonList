import { ReactElement } from 'react';
// Components
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
// MUI
import { CircularProgress, Typography, Button } from '@material-ui/core';
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
  } = props;
  const classes = useStyles();
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
            <div className={classes.grid}>
              {pokemons.map(item => (
                <PokemonCard key={item.name} name={item.name} />
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
