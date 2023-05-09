import userData from "../meals"
import { Data } from "../components/Data/Data"
export const DataPage = () =>(
  <Data meals={userData.meals}></Data>
)