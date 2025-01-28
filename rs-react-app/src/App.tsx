import { Component } from 'react'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import Result from './components/Result/Result'

interface IState {
  searchTerm: string
  results: []
  isLoading: false
  error: string | null
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      isLoading: false,
      error: null
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Result />
        </main>
      </div>
    )
  }
}

export default App
