import { MealList } from "../types";
import { Data } from "../components/Data/Data";
export const DataPage = (props: MealList) => (
  <Data date={props.date} allCalories={props.allCalories} meals={props.meals}/>
);
