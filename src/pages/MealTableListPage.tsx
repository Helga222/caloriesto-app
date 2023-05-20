import { MealTableList } from "../components/MealTableList/MealTableList";
import { MealList } from "../types";
export const MealTableListPage = (props: MealList) => {
  return <MealTableList date={props.date} meals={props.meals}/>;
};
