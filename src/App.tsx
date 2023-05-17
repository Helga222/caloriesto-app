import { useEffect } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
  const currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
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

  const updateData = async (id: string) => {
    const dataToUpdate = doc(database, "users", id).withConverter(
      userConverter
    );

    const data = await updateDoc(dataToUpdate, {
      ...user,
    });
  };

  const updateMealList = async (mealList: MealList) => {
    let dateString= currentDate.toLocaleDateString();
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

    updateData(id);
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
          calorieGoal: user.calorieGoal,
          id: user.id,
        })
          .then(() => {
            alert("Data added");
          })
          .catch((err) => alert(err.message));
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

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        console.log(response);
        const userId = response.user.uid;
        navigate(`/accounts/${userId}`);
      })
      .catch((err) => {
        alert(err.message);
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
