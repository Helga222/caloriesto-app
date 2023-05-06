import React from "react";
import styles from "./MealTable.module.css";
import userData from "../../meals";
import { Meal } from "../../meals";

export const MealTable = (props: Meal) => {
  let finalCalories:number = 0;
  let finalPropteins:number = 0;
  let finalFats:number = 0;
  let finalCarbos:number = 0;
  const items = props.products.map((item) => {
    finalCalories = finalCalories + item.calories;
    finalPropteins = finalPropteins + item.proteins;
    finalCarbos = finalCarbos + item.carbos;
    finalFats = finalFats + item.fats;
    return(
    <div className={styles.foodList__item__row}>
      <div className={styles.foodList__item__product}>{item.name}</div>
      <div className={styles.foodList__item__product}>{item.calories}</div>
      <div className={styles.foodList__item__product}>{item.proteins}</div>
      <div className={styles.foodList__item__product}>{item.fats}</div>
      <div className={styles.foodList__item__product}>{item.carbos}</div>
    </div>
  )});

  return (
    <div className={styles.foodList__item}>
      <label className={styles.foodList__item__label}>{props.type}</label>
      <div className={styles.foodList__item__grid}>
        <div className={styles.foodList__item__row}>
          <div className={styles.foodList__item__header}>Продукт</div>
          <div className={styles.foodList__item__header}>Калории</div>
          <div className={styles.foodList__item__header}>Белки</div>
          <div className={styles.foodList__item__header}>Жиры</div>
          <div className={styles.foodList__item__header}>Углеводы</div>
        </div>
        {items}
        <div className={styles.foodList__item__row}>
          <div className={styles.foodList__item__result}>Итого</div>
          <div className={styles.foodList__item__result}>{finalCalories}</div>
          <div className={styles.foodList__item__result}>{finalPropteins}</div>
          <div className={styles.foodList__item__result}>{finalFats}</div>
          <div className={styles.foodList__item__result}>{finalCarbos}</div>
        </div>
      </div>
    </div>
  );
};
