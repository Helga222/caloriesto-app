import { useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import { User, userConverter } from "../../meals";
import { database } from "../../firebaseConfig";
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore";
import { NavLink, useParams } from "react-router-dom";

export const Calculator = (props: any) => {
  const { id } = useParams();

  const [params, setParams] = useState({
    age: props.age,
    gender: props.gender,
    height: props.height,
    weight: props.weight,
    coeff: props.coeff,
    calorieGoal: props.goal,
  });

  const handleInputs = (event: any) => {
    props.onHandleInput(event);
  };

  useEffect(() => {
    setParams({
      ...params,
      ...{
        age: props.age,
        gender: props.gender,
        height: props.height,
        weight: props.weight,
        coeff: props.coeff,
        calorieGoal: props.goal,
      },
    });
  }, [
    props.age,
    props.gender,
    props.height,
    props.weight,
    props.coeff,
    props.goal,
  ]);

  let goal = 0;
  const handleSubmit = (event: any) => {
    props.onHandleClick(id);
  };

  return (
    <div className={styles.calc__content}>
      <div className={styles.calc__navlink}>      <NavLink  to={`/accounts/${id}`} >назад</NavLink></div>

      <div className={styles.calc__text}>
        Калькулятор калорий позволит вам рассчитать то количество энергии,
        которое необходимо ежедневно получать вашему организму в зависимости от
        вашего роста, веса, возраста и степени физической активности (норма
        калорий).
      </div>
      <div className={styles.calc__form}>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Пол:</label>
          <select
            className={styles.calc__input}
            value={params.gender ? params.gender : ""}
            name="gender"
            onChange={handleInputs}
          >
            пол
            <option>мужской</option>
            <option>женский</option>
          </select>
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Возраст:</label>
          <input
            className={styles.calc__input}
            type="number"
            name="age"
            value={params.age ? params.age : ""}
            placeholder="возраст"
            onChange={handleInputs}
          />
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Рост:</label>
          <input
            className={styles.calc__input}
            type="number"
            name="height"
            placeholder="рост в сантиметрах"
            value={params.height ? params.height : ""}
            onChange={handleInputs}
          />
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Вес:</label>
          <input
            className={styles.calc__input}
            type="number"
            value={params.weight ? params.weight : ""}
            name="weight"
            placeholder="вес в килограммах"
            onChange={handleInputs}
          />
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>
            Уровень физической нагрузки:
          </label>
          <select
            className={styles.calc__input}
            name="coeff"
            value={params.coeff ? params.coeff : ""}
            onChange={handleInputs}
          >
            коэффициент
            <option value={1.2}>cидячий образ жизни без нагрузок</option>
            <option value={1.375}>тренировки 1-3 раза в неделю</option>
            <option value={1.55}>занятия 3-5 дней в неделю</option>
            <option value={1.9}>
              спортсмены, выполняющие упражнения чаще, чем раз в день
            </option>
          </select>
        </div>
        <button
          className={styles.calc__button}
          name="calorieGoal"
          value={params.calorieGoal}
          onClick={handleSubmit}
        >
          Рассчитать количество калорий в день
        </button>
        {params.calorieGoal ? (
          <div className={styles.calc__value}>
            {params.calorieGoal.toFixed(2)} кКал
          </div>
        ) : null}
      </div>
    </div>
  );
};
