import { useEffect } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddMealPage } from "./pages/AddMealPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { DataPage } from "./pages/DataPage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Meal,
  MealList,
  mealConverter,
  productArr,
  userConverter,
} from "./meals";

function App() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    age: 0,
    gender: "мужской",
    height: 0,
    weight: 0,
    coeff: 1.2,
    calorieGoal: 0,
    id: "",
  });
  const auth = getAuth(app);
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const [editedMeal, setEditedMeal] = useState<Meal>();
  const [mealDayList, setMealDayList] = useState<MealList>({
    date: currentDate,
    userId: user.id,
    meals: [
      {
        type: "Завтрак",
        date: currentDate,
        products: [],
      },
      {
        type: "Обед",
        date: currentDate,
        products: [],
      },
      {
        type: "Ужин",
        date: currentDate,
        products: [],
      },
    ],
  });

  const navigate = useNavigate();

  const handleEditMeal = (index: number) => {
    setEditedMeal(mealDayList.meals[index]);
    navigate(`/addmeal/${user.id}/${index}`);
  };

  const handleInputs = (event: any) => {
    let inputs = { [event.target.name]: event.target.value };
    setUser({ ...user, ...inputs });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readData(user.uid);
        readMealList(user.uid);
        console.log(user.uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  }, []);

  const addMealToDayList = (meal: Meal) => {
    const currentType = meal.type.toLowerCase();
    const newArr = { ...mealDayList };
    const index = newArr.meals.findIndex(
      (item) => item.type.toLowerCase() === currentType
    );
    newArr.meals[index] = meal;
    setMealDayList(newArr);
    updateMealList(newArr);
  };

  const readData = async (id: string) => {
    const dataToUpdate = doc(database, "users", id).withConverter(
      userConverter
    );

    const data = await getDoc(dataToUpdate);
    if (data.exists()) {
      setUser(data.data());
      setMealDayList({ ...mealDayList, ...{ userId: data.id } });
    }
  };

  const readMealList = async (id: string) => {
    const dataToUpdate = doc(
      database,
      "mealDayList",
      `${currentDate.toLocaleDateString()}_${id}`
    ).withConverter(mealConverter);

    const data = await getDoc(dataToUpdate);
    if (data.exists()) {
      const mealList = { ...data.data() };
      setMealDayList(mealList);
    }
  };

  const updateData = async (id: string, goal?: number) => {
    const dataToUpdate = doc(database, "users", id).withConverter(
      userConverter
    );

    const data = await updateDoc(dataToUpdate, {
      ...user,
      ...{ calorieGoal: goal },
    });
  };

  const updateMealList = async (mealList: MealList) => {
    let dateString = currentDate.toLocaleDateString();
    await setDoc(
      doc(database, "mealDayList", `${dateString}_${user.id}`).withConverter(
        mealConverter
      ),
      { ...mealList },
      { merge: true }
    );
  };

  const calcCalorieGoal = async (id: string) => {
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

    await setUser({ ...user, ...{ calorieGoal: goal } });

    await updateData(id, goal);
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        console.log(response);
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
          .then(() => {
            alert("Data added");
          })
          .catch((err) => alert(err.message));
        setUser({ ...user, ...{ id: userId } });
        navigate(`/accounts/${userId}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addDataToDB = () => {
    productArr.forEach((product) => {
      addDoc(collection(database, "products"), {
        name: product.name,
        proteins: product.proteins,
        fats: product.fats,
        carbos: product.carbos,
        calories: product.calories,
      })
        .then(() => {
          alert("Data added");
        })
        .catch((err) => alert(err.message));
    });
  };

  const logout = () => {
    signOut(auth);
    navigate(`/`);
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        const userId = response.user.uid;
        navigate(`/accounts/${userId}`);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          alert("Пароль введен неверно(");
        }
        if (error.code === "auth/user-not-found") {
          alert("Пользоваьельн не найден. Зарегестрируйтесь, пожалуйста)");
          navigate("/registration");
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route
          path="/accounts/:id"
          element={
            <MainPage
              meals={mealDayList.meals}
              name={user.name}
              calorieGoal={user.calorieGoal}
              onEditMeal={handleEditMeal}
              onLogout={logout}
            />
          }
        />
        <Route
          path="/addmeal/:id"
          element={
            <AddMealPage date={currentDate} onHandleClick={addMealToDayList} />
          }
        />
        <Route
          path="/addmeal/:id/:mealId"
          element={
            <AddMealPage meal={editedMeal} onHandleClick={addMealToDayList} />
          }
        />
        <Route
          path="/"
          element={
            <AuthenticationPage
              onHandleSubmit={handleSubmit}
              onHandleInputs={handleInputs}
              registration={false}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <AuthenticationPage
              onHandleSubmit={handleRegister}
              onHandleInputs={handleInputs}
              registration={true}
            />
          }
        />
        <Route
          path="/data/:id"
          element={<DataPage date={currentDate} meals={mealDayList.meals} />}
        />
        <Route
          path="/calculator/:id"
          element={
            <CalculatorPage
              onHandleInput={handleInputs}
              onHandleClick={calcCalorieGoal}
              onPageOpen={readData}
              age={user.age}
              height={user.height}
              weight={user.weight}
              coeff={user.coeff}
              gender={user.gender}
              goal={user.calorieGoal}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
