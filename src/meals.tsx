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

export type User = {
  //id:string;
  email:string;
  password:string;
  name:string

  age:number;
  gender:string;
  weight:number;
  height:number;
  calorieGoal: number;
  coeff: number,
  data?:MealList;
}

export const userConverter = {
  toFirestore: (user:User) => {
      return {
          name: user.name,
          email: user.email,
          password: user.password,
          calorieGoal: user.calorieGoal,
          age:user.age,
          height:user.height,
          weight:user.weight,
          gender:user.gender,
          coeff:user.coeff
          };
  },
  fromFirestore: (snapshot:any, options:any):User => {
      const data = snapshot.data(options);
      const dataUser:User = {
        name: data.name,
        email: data.email,
        password: data.password,
        calorieGoal:data.calorieGoal,
        age:data.age,
        height:data.height,
        weight:data.weight,
        gender:data.gender,
        coeff:data.coeff
        };
      return dataUser;
  }
};

/*export const Tom:User = {
  id:'12',
  login:'Tom',
  
}*/

export default userData;