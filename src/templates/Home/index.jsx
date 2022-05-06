import { Component } from "react";

import "./styles.css";

import { Games } from "../../components/Games";
import { loadGames } from "../../utils/load-games";
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    games: [],
    allGames: [],
    page: 0,
    gamesPerPage: 14,
  };

  async componentDidMount() {
    await this.loadGames();
  }

  loadGames = async () => {
    const { page, gamesPerPage } = this.state;

    const games = await loadGames();
    this.setState({
      games: games.slice(page, gamesPerPage),
      allGames: games,
    });
  };

  loadMoreGames = () => {
    const { page, gamesPerPage, allGames, games } = this.state;
    const nextPage = page + gamesPerPage;
    const nextGames = allGames.slice(nextPage, nextPage + gamesPerPage);
    games.push(...nextGames);

    this.setState({ games, page: nextPage });
  };

  render() {
    const { games, page, gamesPerPage, allGames } = this.state;
    const noMoreGames = page + gamesPerPage >= allGames.length;

    return (
      <section className="container">
        <h1>Free Games</h1>
        <Games games={games} />

        <div className="button-container">
          <Button
            text="Load more games"
            onClick={this.loadMoreGames}
            disabled={noMoreGames}
          />
        </div>
      </section>
    );
  }
}
