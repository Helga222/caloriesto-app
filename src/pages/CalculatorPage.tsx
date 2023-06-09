import { Calculator } from "../components/Calculator/Calculator";

export const CalculatorPage = (props: any) => (
  <Calculator
    onPageOpen={props.onOpenPage}
    onHandleClick={props.onHandleClick}
    onHandleInput={props.onHandleInput}
    age={props.age}
    height={props.height}
    weight={props.weight}
    coeff={props.coeff}
    gender={props.gender}
    goal={props.goal}
  />
);
