import { IPersonTravelMarkFront } from "@/lib/models";

interface IProp {
  travelMarks: IPersonTravelMarkFront[]
}

export const BlockWorldVisited = ({ travelMarks }: IProp) => {

  const uniqueCountries = ([... new Set(travelMarks.map((item) => item.location.path.split('.')[1]))].length / 195) * 100
    return (
      <div>Посетил: {travelMarks.length} города(ов) - {uniqueCountries.toFixed(2)}% мира</div>
    );
};
