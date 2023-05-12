import { Authentication } from "../components/Authentication/Authentication";

export const AuthenticationPage = (props:any) =>(
  <Authentication onHandleSubmit={props.onHandleSubmit} onHandleInputs = {props.onHandleInputs}></Authentication>
)