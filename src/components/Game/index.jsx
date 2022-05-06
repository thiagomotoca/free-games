import "./styles.css";

export const Game = ({ thumbnail, title, id, short_description }) => (
  <div className="game">
    <img src={thumbnail} alt={title} />
    <div className="game-content">
      <h2>{title}</h2>
      <p>{short_description}</p>
    </div>
  </div>
);
