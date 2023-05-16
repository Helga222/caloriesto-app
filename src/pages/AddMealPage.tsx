import { AddMeal } from "../components/AddMeal/AddMeal"
import { Meal } from "../meals"

export const AddMealPage = (props:any) =>{
  return(
    <AddMeal meal={props.meal} onHandleClick={props.onHandleClick}></AddMeal>
  )
}