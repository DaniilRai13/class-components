import { Component } from 'react';
import CardList from './CardList/CardList';
import { ApiResponse } from '../../types/resultAPI.interface';

interface IResult {
  result: ApiResponse | null;
  isLoading: boolean;
}

class Result extends Component<IResult> {
  render() {
    const { result, isLoading } = this.props;
    return (
      <>
        <div>
          <CardList result={result} isLoading={isLoading} />
        </div>
      </>
    );
  }
}

export default Result;
