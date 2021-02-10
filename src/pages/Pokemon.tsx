import { ReactElement, useState, useEffect, SVGProps } from 'react';
// Router
import { useParams, useHistory } from 'react-router-dom';
// MUI
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// Types
import pokemonTypes from '../assets/types';
// Api
import { api } from '../service/api';
// Components
import { Pokeball } from '../assets/patterns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: (props: StyleProps) => props.background,
    },
    link: {
      position: 'fixed',
      top: '3vw',
      left: '2vw',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    header: {
      marginTop: '12vh',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '40px',
      },
    },
    image: {
      width: '180px',
      height: '180px',
      [theme.breakpoints.up('sm')]: {
        width: '256px',
        height: '256px',
      },
    },
    pokemonNumber: {
      fontSize: '22px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      color: theme.palette.grey[800],
    },
    pokemonName: {
      fontSize: '35px',
      fontWeight: 'bold',
      lineHeight: '45px',
      textTransform: 'capitalize',
      color: theme.palette.text.primary,
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
    sections: {
      display: 'flex',
      alignItems: 'center',
      margin: '80px 0 10px',
    },
    sectionBtn: {
      position: 'relative',
      border: 'none',
      outline: 'none',
      background: 'none',
      padding: '10px 0',
      fontSize: '20px',
      color: 'rgb(255, 255, 255)',
      textTransform: 'capitalize',
      flex: 1,
      cursor: 'pointer',
      zIndex: 2,
      '& > svg ': {
        position: 'absolute',
        top: '-34px',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: -1,
        width: '170px',
        height: 'auto',
      },
      '& > svg path': {
        fill: 'rgba(255, 255, 255, 0.08)',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '36px',
      },
    },
    sectionContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      background: 'white',
      padding: '0 40px',
      borderRadius: ' 45px 45px 0px 0px',
    },
  })
);

interface TypePokemonResponse {
  type: {
    name: keyof typeof pokemonTypes;
  };
}

interface PokemonTypes {
  name?: string;
  icon: SVGProps<SVGSVGElement>;
  color: string;
}

interface Pokemon {
  id: number;
  number: string;
  image: string;
  specie: string;
  height: string;
  weight: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
  type: PokemonTypes[];
}

interface StyleProps {
  background: string;
}

interface Params {
  name: string;
}

export default function Pokemon(): ReactElement {
  const { name } = useParams<Params>();
  const theme = useTheme<Theme>();
  const history = useHistory();

  const sectionsList: string[] = ['about', 'stats', 'evolution'];
  const [sectionActive, setSectionActive] = useState<string>(sectionsList[0]);
  const [pokemon, setPokemon] = useState({} as Pokemon);
  const [backgroundColor, setBackgroundColor] = useState<
    keyof typeof pokemonTypes
  >('normal');

  const fetchPokemon = async () => {
    const data = await (await fetch(`${api.url}pokemon/${name}`)).json();
    const { id, weight, height, stats, sprites, types, species } = data;

    setBackgroundColor(types[0].type.name);

    if (types[0].type.name === 'normal' && types.length > 1) {
      setBackgroundColor(types[1].type.name);
    }

    setPokemon({
      id,
      number: `#${'000'.substr(id.toString().length)}${id}`,
      image:
        sprites.other['official-artwork'].front_default ||
        sprites.front_default,
      weight: `${weight / 10} kg`,
      specie: species.name,
      height: `${height / 10} m`,
      stats: {
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        specialAttack: stats[3].base_stat,
        specialDefense: stats[4].base_stat,
        speed: stats[5].base_stat,
      },
      type: types.map((pokemonType: TypePokemonResponse) => ({
        name: pokemonType.type.name,
        icon: pokemonTypes[pokemonType.type.name],
        color: theme.palette.pokemon.type[pokemonType.type.name],
      })),
    });
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const screenSelected = () => {
    switch (sectionActive) {
      case 'about':
        return <div>about</div>;
      case 'stats':
        return <div>stats</div>;
      case 'evolution':
        return <div>evolution</div>;
      default:
        throw new Error('Unknown screen selected: ' + sectionActive);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [name]);

  const styleProps: StyleProps = {
    background: theme.palette.pokemon.backgroundType[backgroundColor],
  };
  const classes = useStyles(styleProps);
  return (
    <div className={classes.container}>
      <IconButton
        className={classes.link}
        aria-label='Go back'
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <img className={classes.image} src={pokemon.image} alt={name} />
          <div className={classes.headerContainer}>
            <span className={classes.pokemonNumber}>{pokemon.number}</span>
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
        </header>
        <nav className={classes.sections}>
          {sectionsList.map(nameSection => (
            <button
              key={nameSection}
              onClick={() => setSectionActive(nameSection)}
              style={{ opacity: `${nameSection === sectionActive ? 1 : 0.4}` }}
              className={classes.sectionBtn}
            >
              {nameSection}
              {nameSection === sectionActive && <Pokeball />}
            </button>
          ))}
        </nav>
        <section className={classes.sectionContent}>{screenSelected()}</section>
      </div>
    </div>
  );
}
