import { MealTableList } from "../components/MealTableList/MealTableList";
import { MealList } from "../meals";
export const MealTableListPage = (props:MealList)=>{
  return (
    <MealTableList date={props.date} meals={props.meals}></MealTableList>
)}