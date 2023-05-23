import { Meal } from "../types";

import styles from "../App.module.css";

import { MealTable } from "../components/MealTable/MealTable";

export const MainPage = (props: {
  meals: Meal[];
  name: string;
  calorieGoal: number;
  onEditMeal: any;
  onLogout: any;
  curCalories: number;
}) => {
  return (
    <div className={styles.foodList}>
      <MealTable
        deletable={0}
        products={props.meals[0].products}
        index={0}
        onEditMeal={props.onEditMeal}
        type={props.meals[0].type}
      />
      <MealTable
        deletable={0}
        products={props.meals[1].products}
        index={1}
        onEditMeal={props.onEditMeal}
        type={props.meals[1].type}
      />
      <MealTable
        deletable={0}
        products={props.meals[2].products}
        index={2}
        onEditMeal={props.onEditMeal}
        type={props.meals[2].type}
      />
    </div>
  );
};
