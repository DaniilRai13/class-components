import { Component, ChangeEvent } from 'react';
import styles from './Search.module.scss'
interface SearchState {
  query: string
  apiEndpoints: string[]
  filteredEndpoints: string[]
  isLoading: boolean
  isFocus: boolean
  error: string | null
}

interface SearchProps {
  // onSearchResults: (data: any) => void; 
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
      apiEndpoints: ['people/', 'planets/', 'films/', 'species/', 'vehicles/', 'starships/'],
      filteredEndpoints: ['people/', 'planets/', 'films/', 'species/', 'vehicles/', 'starships/'],
      isFocus: false,
      isLoading: false,
      error: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.toLowerCase();

    const filtered = this.state.apiEndpoints.filter(endpoint =>
      endpoint.toLowerCase().startsWith(query)
    );

    this.setState({ query, filteredEndpoints: filtered });
  };

  handleListShow = (): void => {
    this.setState({ isFocus: true })
  };

  handleListBlur = () => {
    setTimeout(() => {
      this.setState({ isFocus: false });
    }, 90);
    return
  }

  handleSearch = async (endpoint: string): Promise<void> => {
    if (!endpoint) {
      alert('Пожалуйста, выберите запрос');
      return;
    }
    console.log(endpoint)
    this.setState({ isLoading: true, error: null, query: endpoint });

    // try {
    //   const response = await fetch(`https://swapi.dev/api/${endpoint}`);
    //   if (!response.ok) {
    //     throw new Error(`Ошибка: ${response.status}`);
    //   }
    //   const data: ApiResponse = await response.json(); 

    //   this.props.onSearchResults(data);
    // } catch (error) {
    //   this.setState({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' });
    // } finally {
    //   this.setState({ isLoading: false });
    // }
  };

  render() {
    const { query, filteredEndpoints, isLoading, error, isFocus } = this.state;

    return (
      <div className={styles.searchContainer}>
        <div className={styles.apiLabel}>API: https://swapi.dev/api/</div>
        <label className={styles.inputContainer}>
          <input
            type="text"
            value={query}
            onChange={this.handleInputChange}
            onFocus={this.handleListShow}
            onBlur={this.handleListBlur}
            placeholder="Начните вводить запрос"
          />
          {isFocus && <div className={styles.list}>
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
          </div>}
        </label>
        <button onClick={() => this.handleSearch(filteredEndpoints[0])} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Search'}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
}

export default Search;