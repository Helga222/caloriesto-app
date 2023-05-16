import { AddMeal } from "../components/AddMeal/AddMeal"
import { Meal } from "../meals"

export const AddMealPage = (props:any) =>{
  return(
    <AddMeal date={props.date} meal={props.meal} onHandleClick={props.onHandleClick}></AddMeal>
  )
}