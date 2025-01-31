import { Component } from "react";
import CardList from "./CardList/CardList";
import { ApiResponse } from "../../types/resultAPI.interface";

interface IResult {
  result: ApiResponse | null
}

class Result extends Component<IResult> {
  render() {
    const { result } = this.props
    return (
      <>
        <div>
          <h2>Result</h2>
          <CardList result={result} />
        </div>
      </>
    )
  }
}

export default Result;
