import { Game } from "../Game";

import "./styles.css";

export const Games = ({ games }) => (
  <div className="games">
    {games.map((game) => (
      <Game
        key={game.id}
        id={game.id}
        title={game.title}
        thumbnail={game.thumbnail}
        short_description={game.short_description}
      />
    ))}
  </div>
);
