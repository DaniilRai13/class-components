import { Component } from "react";
import { ApiResponse } from "../../../types/resultAPI.interface";
import Card from "./Card/Card";

interface ICardList {
  result: ApiResponse | null
}


class CardList extends Component<ICardList> {

  render() {
    const { result } = this.props

    return (
      <>
        <div>
          <div>
            <h4>Item name</h4>
            <h4>Item description</h4>
          </div>
          <div>
            {result?.results
              && result.results.map((item, index) => (
                <Card
                  key={index}
                  item={item}
                  resultType={result.constructor.name} />
              ))}
          </div>
        </div>
      </>
    )
  }
}

export default CardList;