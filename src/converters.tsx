import { Timestamp } from "firebase/firestore";
import { MealList, User } from "./types";

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      calorieGoal: user.calorieGoal,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      coeff: user.coeff,
      id: user.id,
    };
  },
  fromFirestore: (snapshot: any, options: any): User => {
    const data = snapshot.data(options);
    const dataUser: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      calorieGoal: data.calorieGoal,
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender,
      coeff: data.coeff,
      id: data.id,
    };
    return dataUser;
  },
};

export const mealConverter = {
  toFirestore: (mealList: MealList) => {
    const meals = mealList.meals.map((meal) => ({
      date: meal.date,
      products: meal.products,
      type: meal.type,
    }));
    return {
      ...mealList,
      ...{
        meals: meals,
        date: Timestamp.fromDate(mealList.date),
        userId: mealList.userId,
        allCalories:mealList.allCalories
      },
    };
  },

  fromFirestore: (snapshot: any, options: any): MealList => {
    const data = snapshot.data(options) as MealList;
    const curDate = new Date(
      (data.date as unknown as Timestamp).seconds * 1000
    );
    const dataMeals = { date: curDate, meals: data.meals, userId: data.userId,allCalories:data.allCalories };
    return dataMeals;
  },
};
