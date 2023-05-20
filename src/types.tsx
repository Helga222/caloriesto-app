export type Product = {
  name: string;
  proteins: number;
  fats: number;
  carbos: number;
  calories: number;
};

export type Meal = {
  date: Date;
  type: string;
  products: Product[];
};

export type MealList = {
  meals: Meal[];
  date: Date;
  userId?: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;

  age: number;
  gender: string;
  weight: number;
  height: number;
  calorieGoal: number;
  coeff: number;
  data?: MealList;
};
