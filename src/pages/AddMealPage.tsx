import { AddMeal } from "../components/AddMeal/AddMeal";

export const AddMealPage = (props: any) => {
  return (
    <AddMeal
      date={props.date}
      meal={props.meal}
      onHandleClick={props.onHandleClick}
    />
  );
};
