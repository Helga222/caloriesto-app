import { Meal, MealList } from "../../meals";
import { MealTable } from "../MealTable/MealTable";

export const MealTableList = ({ meals }: MealList) => {
  const mealArray = meals.map((meal) => (
    <MealTable
      deletable={0}
      products={meal.products}
      type={meal.type}
    ></MealTable>
  ));

  return <div>{mealArray}</div>;
};
