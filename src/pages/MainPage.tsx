import { Meal } from "../types";

import styles from "../App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { MealTable } from "../components/MealTable/MealTable";

export const MainPage = (props: {
  meals: Meal[];
  name: string;
  calorieGoal: number;
  onEditMeal: any;
  onLogout: any;
}) => {
  const { id } = useParams();

  const [name, setName] = useState(props.name);
  const [calorieGoal, setCalorieGoal] = useState(props.calorieGoal);
  const [restGoal, setRestGoal] = useState("");

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/calculator/${id}`;
    navigate(path);
  };

  return (
    <div className={styles.content}>
      <div className={styles.menu}>
        <div className={styles.menu__item}>
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
            {props.calorieGoal
              ? `Норма: ${props.calorieGoal} кКал`
              : "Рассчитайте норму калорий в калькуляторе"}
          </button>

          <button
            onClick={() => navigate(`/addmeal/${id}`)}
            className={`${styles.menu__button} ${styles.menu__button__add} ${styles.menu__button__thin}`}
          >
            Добавить прием пищи
          </button>
          <button
            onClick={() => navigate(`/data/${id}`)}
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
            onClick={props.onLogout}
            className={`${styles.menu__button} ${styles.menu__button__exit} ${styles.menu__button__thin}`}
          >
            Выход
          </button>
        </div>
        <div className={styles.menu__item}></div>
      </div>
      <div className={styles.foodList}>
        <MealTable
          deletable={0}
          products={props.meals[0].products}
          index={0}
          onEditMeal={props.onEditMeal}
          type={props.meals[0].type}
        />
        <MealTable
          deletable={0}
          products={props.meals[1].products}
          index={1}
          onEditMeal={props.onEditMeal}
          type={props.meals[1].type}
        />
        <MealTable
          deletable={0}
          products={props.meals[2].products}
          index={2}
          onEditMeal={props.onEditMeal}
          type={props.meals[2].type}
        />
      </div>
    </div>
  );
};
