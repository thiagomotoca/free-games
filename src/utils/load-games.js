const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    "X-RapidAPI-Key": "883dbd1879msh546e6e5397bde11p19b5ebjsn59a5ad901804",
  },
};

export const loadGames = async () => {
  const response = fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    options
  );

  const [games] = await Promise.all([response]);
  const gamesJson = await games.json();

  return gamesJson;
};
