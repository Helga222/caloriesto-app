import { MealList } from "../../types";
import { MealTable } from "../MealTable/MealTable";

export const MealTableList = ({ meals, date,allCalories }: MealList) => {
  const mealArray = meals.map((meal) => (
    <MealTable deletable={0}  products={meal.products} type={meal.type} />
  ));

  return <div>{mealArray}</div>;
};
