import userData, { User, userConverter } from "../meals";
import { MealTableListPage } from "./MealTableListPage";
import styles from "../App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { app, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


// Firestore data converter


export const MainPage = (props:any) => {
  /*const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [user, loading, error] = useAuthState(auth);*/

  const {id} = useParams();

  const [name,setName]=useState(props.name);
  const [calorieGoal,setCalorieGoal] = useState(props.calorieGoal);
  const [restGoal,setRestGoal] = useState('');


  useEffect(() => {
    //fetchPost();
  });




 /* const fetchPost = async () => {

    await getDocs(collection(database, "users",).withConverter(userConverter)).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setName(newData[0].name)
      newData[0]?.calorieGoal && setCalorieGoal(newData[0].calorieGoal);
    });
  };
*/
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/calculator/${id}`;
    navigate(path);
  };

  return (
    <div className={styles.content}>
      <div className={styles.menu}>
        <div>
          <button
            className={`${styles.menu__button} ${styles.menu__button__user} ${styles.menu__button__thin}`}
          >
            {props.name}
          </button>
          <button
            className={`${styles.menu__button} ${styles.menu__button__rest} ${styles.menu__button__thick}`}
          >
            Осталось 1500 кКал
          </button>
          <button
            className={`${styles.menu__button} ${styles.menu__button__goal} ${styles.menu__button__thick}`}
          >
            {props.calorieGoal ? `Норма: ${props.calorieGoal} кКал` : 'Рассчитайте норму калорий в калькуляторе'}
          </button>
        </div>
        <div>
          <button
            className={`${styles.menu__button} ${styles.menu__button__add} ${styles.menu__button__thin}`}
          >
            Добавить прием пищи
          </button>
          <button
            className={`${styles.menu__button} ${styles.menu__button__data} ${styles.menu__button__thin}`}
          >
            Мои данные
          </button>
          <button
            className={`${styles.menu__button} ${styles.menu__button__calc} ${styles.menu__button__thin}`}
            onClick={routeChange}
          >
            Калькулятор калорий
          </button>
          <button
            className={`${styles.menu__button} ${styles.menu__button__exit} ${styles.menu__button__thin}`}
          >
            Выход
          </button>
        </div>
      </div>
      <div className={styles.foodList}>
        <MealTableListPage meals={userData.meals}></MealTableListPage>
      </div>
    </div>
  );
};
