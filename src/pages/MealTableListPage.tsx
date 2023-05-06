import { MealTableList } from "../components/MealTableList/MealTableList";
import { MealList } from "../meals";
export const MealTableListPage = (props:MealList)=>{
  return (
    <MealTableList meals={props.meals}></MealTableList>
)}