type Product = {
  name:string;
  count: number;
  proteins:number;
  fats: number;
  carbos: number;
  calories:number;
  id:string;
}

export type Meal = {
  date: number;
  type: string;
  products:Product[];
  id:string;
}

const chicken:Product = {
  name:"Курица",
  calories:180,
  carbos:100,
  count:200,
  fats:40,
  id:"1",
  proteins:0
}

const potato:Product = {
  name:"Кaртофель",
  calories:120,
  carbos:120,
  count:220,
  fats:30,
  id:"2",
  proteins:2
}

const apple:Product = {
  name:"Яблоко",
  calories:70,
  carbos:40,
  count:10,
  fats:20,
  id:"3",
  proteins:0
}

export const breakfast:Meal = {
  date: Date.now(),
  id:"1",
  products:[apple,potato,chicken],
  type:"Завтрак"
}

const dinner:Meal = {
  date: Date.now(),
  id:"2",
  products:[apple,chicken],
  type:"Ужин"
}

const supper:Meal = {
  date: Date.now(),
  id:"3",
  products:[],
  type:"Обед"
}
export type MealList = {
  meals:Meal[]
}

const userData:MealList ={
  meals:[breakfast,supper,dinner]
};

export default userData;