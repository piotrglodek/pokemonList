interface API {
  url: string;
  limit: number;
  offset: number;
  maxResults: number;
}

export const api: API = {
  url: `https://pokeapi.co/api/v2/`,
  limit: 9,
  offset: 9,
  maxResults: 1118,
};
