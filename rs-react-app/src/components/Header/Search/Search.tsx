import { Component, ChangeEvent } from 'react';
import styles from './Search.module.scss';

interface SearchState {
  query: string | null;
  apiEndpoints: string[];
  filteredEndpoints: string[];
  isFocus: boolean;
  error: string | null;
}

interface SearchProps {
  onSearchResults: (endpoint: string) => void;
  isLoading: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: localStorage.getItem('searchTerm'),
      apiEndpoints: [
        'people/',
        'planets/',
        'films/',
        'species/',
        'vehicles/',
        'starships/',
      ],
      filteredEndpoints: [
        'people/',
        'planets/',
        'films/',
        'species/',
        'vehicles/',
        'starships/',
      ],
      isFocus: false,
      error: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(): void {
    if (!this.state.query) return;
    this.handleSearch(this.state.query);
  }
  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.toLowerCase();

    const filtered = this.state.apiEndpoints.filter((endpoint) =>
      endpoint.toLowerCase().startsWith(query)
    );

    this.setState({ query, filteredEndpoints: filtered });
  };

  handleListShow = (): void => {
    this.setState({ isFocus: true });
  };

  handleListBlur = () => {
    setTimeout(() => {
      this.setState({ isFocus: false });
    }, 200);
  };

  handleSearch = async (endpoint: string): Promise<void> => {
    this.setState({ query: endpoint });
    try {
      this.props.onSearchResults(endpoint);
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  render() {
    const { query, filteredEndpoints, isFocus } = this.state;

    return (
      <div className={styles.searchContainer}>
        <div className={styles.apiLabel}>API: https://swapi.dev/api/</div>
        <label className={styles.inputContainer}>
          <input
            type="text"
            value={query || ''}
            onChange={this.handleInputChange}
            onFocus={this.handleListShow}
            onBlur={this.handleListBlur}
            placeholder="Начните вводить запрос"
          />
          {isFocus && (
            <div className={styles.list}>
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() => this.handleSearch(endpoint)}
                  >
                    {endpoint}
                  </div>
                ))
              ) : (
                <div>Нет доступных запросов</div>
              )}
            </div>
          )}
        </label>
        <button
          onClick={() => this.handleSearch(this.state.query || '')}
          disabled={this.props.isLoading}
        >
          {this.props.isLoading ? 'Загрузка...' : 'Search'}
        </button>
      </div>
    );
  }
}

export default Search;
