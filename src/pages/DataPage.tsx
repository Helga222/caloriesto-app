import  { Meal, MealList } from "../meals"
import { Data } from "../components/Data/Data"
export const DataPage = (props:MealList) =>(
  <Data date={props.date} meals={props.meals}></Data>
)