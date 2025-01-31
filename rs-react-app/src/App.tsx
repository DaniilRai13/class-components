import { Component } from 'react'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { ApiResponse } from './types/resultAPI.interface'

interface IState {
  result: ApiResponse | null
  isLoading: false
  error: string | null
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      result: null,
      isLoading: false,
      error: null
    }
  }
  
  onSearchResults = (data: ApiResponse) => {
    if (!data) return

    this.setState({ result: data })
  }

  render() {
    return (
      <div className={styles.container}>
        <Header onSearchResults={this.onSearchResults} />
        <Main result={this.state.result} />
      </div>
    )
  }
}

export default App
