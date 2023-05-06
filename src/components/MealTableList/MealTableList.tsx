import { Meal,MealList } from "../../meals";
import { MealTable } from "../MealTable/MealTable";

export const MealTableList = ({meals}:MealList) => {
  const mealArray = meals.map((meal) => (
    <MealTable
      date={meal.date}
      id={meal.id}
      products={meal.products}
      type={meal.type}
    ></MealTable>
  ));

  return <div>{mealArray}</div>;
};
