import { Component } from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { ApiResponse } from './types/resultAPI.interface';
import { SwapiApiServices } from './services/SwipApiServices';
import { localStorageHelper } from './shared/useLocalStorage';

interface IState {
  result: ApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      result: null,
      isLoading: false,
      error: null,
    };
  }

  onSearchResults = async (endpoint: string) => {
    if (!endpoint) return;

    this.setState({ isLoading: true });

    try {
      const data = await SwapiApiServices.get(endpoint);
      const endpointEdit = endpoint.trim().toLowerCase().split('/')[0];
      localStorageHelper.setToLocalStorage('searchTerm', endpointEdit);
      this.setState({ result: data });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Header
          onSearchResults={this.onSearchResults}
          isLoading={this.state.isLoading}
        />
        <Main result={this.state.result} isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default App;
