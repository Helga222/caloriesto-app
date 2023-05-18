import React from "react";
import styles from "./MealTable.module.css";
import { Product } from "../../meals";
import { Meal } from "../../meals";
import { type } from "os";


export const MealTable = (props: { products: Product[],type:string, deletable:number, onDeleteClick?: any,onEditMeal?: any, index?:number}) => {

  const onEditMeal = (event:any)=>{
    props.onEditMeal(event.target.value);
  }
  let finalCalories:number = 0;
  let finalPropteins:number = 0;
  let finalFats:number = 0;
  let finalCarbos:number = 0;
  const items = props.products.map((item,index) => {
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
      { props.onDeleteClick ? <button className={styles.foodList__item__product} value={index} onClick={(event:any)=>props.onDeleteClick(event.target.value)}>Удалить</button>: ''}
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
          { props.deletable ? <div className={`${styles.foodList__item__header} ${styles.hidden}` }></div> : ''}
        </div>
        {items}
        <div className={styles.foodList__item__row}>
          <div className={styles.foodList__item__result}>Итого</div>
          <div className={styles.foodList__item__result}>{finalCalories.toFixed(2)}</div>
          <div className={styles.foodList__item__result}>{finalPropteins.toFixed(2)}</div>
          <div className={styles.foodList__item__result}>{finalFats.toFixed(2)}</div>
          <div className={styles.foodList__item__result}>{finalCarbos.toFixed(2)}</div>
          {props.deletable ? <div className={`${styles.foodList__item__result} ${styles.hidden}`}></div> : ''}
        </div>
      </div>
          { props.onEditMeal ? <div className={styles.foodList__ref} ><data value={props.index} onClick={onEditMeal}>редактировать</data> </div>: ''}
    </div>
  );
};
