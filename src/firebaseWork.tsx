import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, database } from "./firebaseConfig";
import { MealList, Product, User } from "./types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { mealConverter, userConverter } from "./converters";

export const auth = getAuth(app);

export const getDataFromFirebase = async (id: string) => {
  const dataToUpdate = doc(database, "users", id).withConverter(userConverter);

  const data = await getDoc(dataToUpdate);

  return { data: data.data(), id: data.id };
};

export const updateFirebaseData = async (
  id: string,
  user: User,
  goal: number
) => {
  const dataToUpdate = doc(database, "users", id).withConverter(userConverter);

  const data = await updateDoc(dataToUpdate, {
    ...user,
    ...{ calorieGoal: goal },
  });
};

export const registerFirebase = (user: User) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((response) => {
      const userId = response.user.uid;
      setDoc(doc(database, "users", userId), {
        email: user.email,
        password: user.password,
        name: user.name,
        weight: user.weight,
        height: user.height,
        coeff: user.coeff,
        age: user.age,
        gender: user.gender,
        calorieGoal: user.calorieGoal,
        id: userId,
      })
        .then(() => {})
        .catch((err) => alert(err.message));
      return userId;
    })
    .catch((err) => {
      if (err.code === "auth/weak-password") {
        alert("Этот пароль слабый, придумайте другой!");
      }
    });
};

const addDataToDB = (productArr: Product[]) => {
  productArr.forEach((product) => {
    addDoc(collection(database, "products"), {
      name: product.name,
      proteins: product.proteins,
      fats: product.fats,
      carbos: product.carbos,
      calories: product.calories,
    })
      .then(() => {})
      .catch((err) => alert(err.message));
  });
};

export const logoutFirebase = () => {
  signOut(auth);
};

export const loginFirebase = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      const userId = response.user.uid;
      navigate(`/accounts/${userId}`);
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password") {
        alert("Пароль введен неверно(");
      }
      if (error.code === "auth/user-not-found") {
        alert("Пользователь не найден. Зарегестрируйтесь, пожалуйста)");
        navigate("/registration");
      }
    });
};

export const updateMealListFirebase = async (
  mealList: MealList,
  curDate: string,
  id: string
) => {
  await setDoc(
    doc(database, "mealDayList", `${curDate}_${id}`).withConverter(
      mealConverter
    ),
    { ...mealList },
    { merge: true }
  );
};

export const readMealListFirebase = async (id: string, curDate: string) => {
  const dataToUpdate = doc(
    database,
    "mealDayList",
    `${curDate}_${id}`
  ).withConverter(mealConverter);

  const data = await getDoc(dataToUpdate);
  return { data: data.data() };
};
