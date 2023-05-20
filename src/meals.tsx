import { Timestamp } from "firebase/firestore";


export type Product = {
  name:string;
  proteins:number;
  fats: number;
  carbos: number;
  calories:number;
}

export type Meal = {
  date: Date;
  type: string;
  products:Product[];
}

const chicken:Product = {
  name:"Курица",
  calories:180,
  carbos:100,
  //count:200,
  fats:40,
  //id:"1",
  proteins:0
}

const potato:Product = {
  name:"Кaртофель",
  calories:120,
  carbos:120,
  //count:220,
  fats:30,
  //id:"2",
  proteins:2
}

const apple:Product = {
  name:"Яблоко",
  calories:70,
  carbos:40,
  //count:10,
  fats:20,
  //id:"3",
  proteins:0
}


export type MealList = {
  meals:Meal[],
  date:Date,
  userId?:string
}

export type User = {
  id:string;
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
          coeff:user.coeff,
          id:user.id
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
        coeff:data.coeff,
        id:data.id
        };
      return dataUser;
  }
};

export const mealConverter = {
  toFirestore: (mealList:MealList) => {
    const meals = mealList.meals.map(meal=>({
      date: meal.date,
      products:meal.products,
      type:meal.type,
  }))
    return {...mealList,...{meals:meals,date:Timestamp.fromDate(mealList.date),userId:mealList.userId}}
},
  
  fromFirestore: (snapshot:any, options:any):MealList => {
      const data = snapshot.data(options) as MealList;
      const curDate = new Date((data.date as unknown as Timestamp).seconds*1000);
      const dataMeals = {date:curDate,meals:data.meals,userId:data.userId};
    return dataMeals;
}};



export const productArr:Product[] =[
  {
    name:'баранки',
    fats:1.3,
    proteins:10.4,
    carbos:64.2,
    calories:311
  },
  {
    name:'батон нарезной',
    fats:2.9,
    proteins:7.5,
    carbos:51.4,
    calories:262
  },
  {
    name:'запеканка рисовая с творогом',
    fats:7.1,
    proteins:5.1,
    carbos:26.1,
    calories:189
  },
  {
    name:'каша овсяная',
    fats:4.1,
    proteins:2.6,
    carbos:15.5,
    calories:109
  },
  {
    name:'макароны отварные',
    fats:0.4,
    proteins:3.6,
    carbos:20,
    calories:98
  },
  {
    name:'оладьи из муки',
    fats:6.6,
    proteins:6.5,
    carbos:31.6,
    calories:213
  },
  {
    name:'вафли с фруктово-ягодными начинками',
    fats:3.3,
    proteins:2.8,
    carbos:77.3,
    calories:354
  },
  {
    name:'зефир',
    fats:0.1,
    proteins:0.8,
    carbos:79.8,
    calories:326
  },
  {
    name:'ирис полутвердый',
    fats:7.6,
    proteins:3.3,
    carbos:81.5,
    calories:408
  },
  {
    name:'шоколад горький',
    fats:30.3,
    proteins:8,
    carbos:48.2,
    calories:500
  },
  {
    name:'шоколад молочный',
    fats:35.4,
    proteins:6.2,
    carbos:48.2,
    calories:539
  },
  {
    name:'йогурт плодово-ягодный, 1,5% жирности',
    fats:29,
    proteins:21,
    carbos:2,
    calories:353
  },
  {
    name:'кефир 2,5% жирности',
    fats:0.1,
    proteins:3,
    carbos:4,
    calories:31
  },
  {
    name:'молоко стерилизованное 3,2% жирности',
    fats:0.2,
    proteins:6.6,
    carbos:10.8,
    calories:71
  },
] 

//export default userData;