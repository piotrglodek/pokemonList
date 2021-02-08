interface API {
  url: string;
  maxResults: number;
}

export const api: API = {
  url: `https://pokeapi.co/api/v2/`,
  maxResults: 1118,
};
