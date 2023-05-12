import React, { ReactEventHandler, SyntheticEvent, useEffect } from "react";
import styles from "./App.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddMealPage } from "./pages/AddMealPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { DataPage } from "./pages/DataPage";
import { CalculatorPage } from "./pages/CalculatorPage";
//import { Tom as user } from "./meals";
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
import { userConverter } from "./meals";

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
  });
  const auth = getAuth(app);
  const db = collection(database, "users");

  const navigate = useNavigate();

  const handleInputs = (event: any) => {
    let inputs = { [event.target.name]: event.target.value };
    setUser({ ...user, ...inputs });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readData(user.uid);
        console.log(user.uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  }, []);

  const readData = async (id: string) => {
    const dataToUpdate = doc(database, "users", id).withConverter(
      userConverter
    );

    const data = await getDoc(dataToUpdate);
    if (data.exists()) {
      setUser(data.data());
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
          element={<MainPage name={user.name} calorieGoal={user.calorieGoal} />}
        />
        <Route path="/addmeal" element={<AddMealPage />} />
        <Route
          path="/"
          element={
            <AuthenticationPage
              onHandleSubmit={handleSubmit}
              onHandleInputs={handleInputs}
            />
          }
        />
        <Route path="/data" element={<DataPage />} />
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
