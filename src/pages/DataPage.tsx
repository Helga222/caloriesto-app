import  { Meal, MealList } from "../meals"
import { Data } from "../components/Data/Data"
export const DataPage = (props:MealList) =>(
  <Data meals={props.meals}></Data>
)