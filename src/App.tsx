import { useEffect } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddMealPage } from "./pages/AddMealPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { DataPage } from "./pages/DataPage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Meal, MealList } from "./types";
import {
  auth,
  getDataFromFirebase,
  loginFirebase,
  logoutFirebase,
  readMealListFirebase,
  registerFirebase,
  updateFirebaseData,
  updateMealListFirebase,
} from "./firebaseWork";
import { calcCalorieGoal } from "./utils";

function App() {
  const initialUserState = {
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
  }
  const [user, setUser] = useState(initialUserState);

  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const [editedMeal, setEditedMeal] = useState<Meal>();
  const [mealDayList, setMealDayList] = useState<MealList>({
    date: currentDate,
    allCalories:0,
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

    let sum=0;
    mealDayList.meals.forEach(meal=>{
      sum = sum + meal.products.reduce((acc,x)=>acc+x.calories,0);
      return sum;
    })

    setMealDayList({...newArr,...{allCalories:sum}});
    updateMealList({...newArr,...{allCalories:sum}});
  };

  const readData = async (id: string) => {
    const data = await getDataFromFirebase(id);
    if (data.data) {
      setUser(data.data);
      setMealDayList({ ...mealDayList, ...{ userId: data.id } });
    }
  };

  const readMealList = async (id: string) => {
    const newData = await readMealListFirebase(
      id,
      currentDate.toLocaleDateString()
    );
    if (newData.data) {
      setMealDayList({ ...newData.data });
    }
  };

  const updateData = (id: string, goal: number) => {
    updateFirebaseData(id, user, goal);
  };

  const updateMealList = async (mealList: MealList) => {
    let dateString = currentDate.toLocaleDateString();
    updateMealListFirebase(mealList, dateString, user.id);
  };

  const onCalcCalorieGoal = async (id: string) => {
    const goal = calcCalorieGoal(user);
    if (goal) {
      await setUser({ ...user, ...{ calorieGoal: goal } });

      await updateData(id, goal);
    }
  };

  const handleRegister = () => {
    if (user.email && user.password){
      if (!user.name){
        alert('Введите свое имя!');
        return;
      }
      registerFirebase(user).then((userId) => {
        if (userId){
          setUser({...user,...{id:userId as string}} );
          navigate(`/accounts/${userId}`);
        }

      }).catch(err=>console.log(err));
    }
    else alert('Введите логин и пароль!')
  };

  const logout = () => {
    logoutFirebase();
    setUser(initialUserState);
    navigate(`/`);
  };

  const handleSubmit = () => {
      loginFirebase(user.email, user.password, navigate);
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
              curCalories = {mealDayList.allCalories}
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
          element={<DataPage date={currentDate} allCalories={mealDayList.allCalories} meals={mealDayList.meals} />}
        />
        <Route
          path="/calculator/:id"
          element={
            <CalculatorPage
              onHandleInput={handleInputs}
              onHandleClick={onCalcCalorieGoal}
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
