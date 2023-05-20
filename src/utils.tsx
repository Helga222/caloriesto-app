import { User } from "./types";

export const calcCalorieGoal = (user:User) => {
  if (!user.age || !user.height || !user.weight) {
    return;
  }

  let bmr: number = 0;

  if (user.gender === "мужской") {
    bmr = 88.36 + 13.4 * user.weight + 4.8 * user.height - 5.7 * user.age;
  } else {
    bmr = 447.6 + 9.2 * user.weight + 3.1 * user.height - 4.3 * user.age;
  }
  const goal = Math.floor((bmr * user.coeff * 100) / 100);
  return goal;
};