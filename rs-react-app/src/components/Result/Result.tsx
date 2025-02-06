import { FC } from 'react';
import { CardList } from './CardList/CardList';
import { IPeoples } from '../../types/resultAPI.interface';

interface IResult {
  result: IPeoples | null;
  isLoading: boolean;
}

export const Result: FC<IResult> = ({ result, isLoading }) => {
  return (
    <>
      <div>
        <CardList result={result} isLoading={isLoading} />
      </div>
    </>
  );
}

