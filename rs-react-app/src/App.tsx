import { Component } from 'react'

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
      <></>
    )
  }
}

export default App
