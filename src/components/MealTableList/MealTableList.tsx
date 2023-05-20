import { MealList } from "../../meals";
import { MealTable } from "../MealTable/MealTable";

export const MealTableList = ({ meals, date }: MealList) => {
  const mealArray = meals.map((meal) => (
    <MealTable deletable={0} products={meal.products} type={meal.type} />
  ));

  return <div>{mealArray}</div>;
};
