import { useEffect, useState, SVGProps } from 'react';
// MUI
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
// Assets
import iconTypePokemon from '../assets/types';
import { Pokeball } from '../assets/patterns';
// Router
import { Link } from 'react-router-dom';
// Service
import { api } from '../service/api';

interface Props {
  name: string;
}

interface StyleProps {
  background: string;
}

interface PokemonTypes {
  name: string;
  color: string;
  icon: SVGProps<SVGSVGElement>;
}

interface Pokemon {
  id: string;
  image: string;
  type: PokemonTypes[];
  backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      height: '180px',
      borderRadius: '6px',
      boxShadow: '1px 3px 12px 0 rgba(0, 0, 0, 0.3)',
      background: (props: StyleProps) => props.background,
      textDecoration: 'none',
      '& > svg': {
        position: 'absolute',
        right: '5px',
        top: 0,
        height: '130px',
        width: '130px',
      },
      '& > svg path': {
        fill: 'rgba(255, 255, 255, 0.2)',
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: '30px',
        '& > svg': {
          height: '180px',
          width: '180px',
        },
      },
    },
    pokemon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      position: 'relative',
      paddingLeft: '20px',
      flex: '1',
      zIndex: 999,
      [theme.breakpoints.up('md')]: {
        paddingLeft: '30px',
      },
    },
    pokemonNumber: {
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      color: theme.palette.grey[800],
      [theme.breakpoints.up('md')]: {
        paddingLeft: '20px',
      },
    },
    pokemonName: {
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '45px',
      textTransform: 'capitalize',
      color: theme.palette.text.primary,
      zIndex: 999,
      [theme.breakpoints.up('md')]: {
        fontSize: '30px',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '35px',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '40px',
      },
    },
    pokemonImg: {
      position: 'absolute',
      right: '0',
      top: ' -20px',
      height: '130px',
      width: '130px',
      [theme.breakpoints.up('md')]: {
        top: ' -50px',
        height: '210px',
        width: '210px',
      },
    },
    pokemonTypeContainer: {
      display: 'flex',
      marginTop: '5px',
    },
    pokemonType: {
      display: 'flex',
      alignItems: 'center',
      padding: '5px',
      borderRadius: '3px',
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1),
      },
      '& svg': {
        width: '18px',
        height: '18px',
      },
      '& svg path': {
        fill: theme.palette.text.secondary,
      },
      '& span': {
        marginLeft: '8px',
        color: theme.palette.text.secondary,
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '14px',
        textTransform: 'capitalize',
        [theme.breakpoints.up('md')]: {
          fontSize: '18px',
        },
      },
      '& + div': {
        marginLeft: '10px',
      },
    },
  })
);

const PokemonCard = ({ name }: Props) => {
  const theme: Theme = useTheme();

  const [pokemon, setPokemon] = useState({} as Pokemon);

  const getPokemonData = async () => {
    const data = await (await fetch(`${api.url}pokemon/${name}`)).json();
    const { id, sprites, types } = data;

    let bgColor: keyof typeof iconTypePokemon = types[0].type.name;
    if (bgColor === 'normal' && types.length > 1) {
      bgColor = types[1].type.name;
    }

    setPokemon({
      id,
      backgroundColor: theme.palette.pokemon.backgroundType[bgColor],
      image: sprites.other['official-artwork'].front_default,
      type: types.map((pokemonType: any) => {
        const typeName = pokemonType.type.name as keyof typeof iconTypePokemon;
        return {
          name: typeName,
          icon: iconTypePokemon[typeName],
          color: theme.palette.pokemon.type[typeName],
        };
      }),
    });
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  const styleProps: StyleProps = { background: pokemon.backgroundColor };
  const classes = useStyles(styleProps);

  return (
    <Link to={`/pokemon/${name}`} className={classes.container}>
      <div className={classes.pokemon}>
        <span className={classes.pokemonNumber}>#{pokemon.id}</span>
        <span className={classes.pokemonName}>{name}</span>
        {pokemon.type && (
          <div className={classes.pokemonTypeContainer}>
            {pokemon.type.map(pokemonType => (
              <div
                className={classes.pokemonType}
                style={{ backgroundColor: pokemonType.color }}
                key={pokemonType.name}
              >
                {pokemonType.icon} <span>{pokemonType.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pokeball />
      {pokemon.image && (
        <img
          className={classes.pokemonImg}
          src={pokemon.image}
          alt={`${name} image`}
        />
      )}
    </Link>
  );
};

export default PokemonCard;
