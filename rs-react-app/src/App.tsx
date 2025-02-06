import { Component } from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { SwapiApiServices } from './services/SwipApiServices';
import { localStorageHelper } from './shared/useLocalStorage';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import { IPeoples } from './types/resultAPI.interface';

interface IState {
  result: IPeoples | null;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, IState> {
  constructor(props: object) {
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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        error: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  throwError = () => {
    this.setState({ error: 'Test error' });
    throw new Error('Test error');
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <ErrorBoundary
        error={this.state.error || ''}
        resetError={this.resetError}
      >
        <div className={styles.container}>
          <Header
            onSearchResults={this.onSearchResults}
            isLoading={this.state.isLoading}
          />
          <Main result={this.state.result} isLoading={this.state.isLoading} />
          <Footer />
          <button className={styles.throwErrorBtn} onClick={this.throwError}>
            Throw Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
