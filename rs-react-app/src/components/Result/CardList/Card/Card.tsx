import { Component } from "react";
import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle } from "../../../../types/resultAPI.interface";

interface ICard {
  item: IPeople | IPlanet | IFilm | ISpecie | IVehicle | IStarship;
  resultType: string;
}

class Card extends Component<ICard> {
  render() {
    const { resultType, item } = this.props;
    console.log(resultType, item)
    return (
      <>
        <div>
          <h2>item</h2>
        </div>
      </>
    )
  }
}

export default Card;