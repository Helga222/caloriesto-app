import { Authentication } from "../components/Authentication/Authentication";

export const AuthenticationPage = (props:any) =>(
  <Authentication  registration={props.registration} onHandleSubmit={props.onHandleSubmit} onHandleInputs = {props.onHandleInputs}></Authentication>
)