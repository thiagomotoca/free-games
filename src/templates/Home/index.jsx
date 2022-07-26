import { Component } from "react";

import "./styles.css";

import { Games } from "../../components/Games";
import { loadGames } from "../../utils/load-games";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    games: [],
    allGames: [],
    page: 0,
    gamesPerPage: 6,
    searchValue: "",
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { games, page, gamesPerPage, allGames, searchValue } = this.state;
    const noMoreGames = page + gamesPerPage >= allGames.length;

    const filteredGames = !!searchValue
      ? games.filter((game) => {
          return game.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : games;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredGames.length > 0 && <Games games={filteredGames} />}

        {filteredGames.length === 0 && <p>Didnt find any game</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more games"
              onClick={this.loadMoreGames}
              disabled={noMoreGames}
            />
          )}
        </div>
      </section>
    );
  }
}
