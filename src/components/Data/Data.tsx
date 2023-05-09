import { MealList } from "../../meals";
import styles from "./Data.module.css";

export const Data = (props: MealList) => {
  const sortedMeals = props.meals.sort((a, b) => (a.date > b.date ? 1 : -1));

  let breakfastCalories: number = 0;
  let supperCalories: number = 0;
  let dinnerCalories: number = 0;

  const items = props.meals.map((meal, index, array) => {
    let totalCaloies = meal.products.reduce(
      (acc, item) => acc + item.calories,
      0
    );
    if (meal.type === "breakfast") {
      breakfastCalories = totalCaloies;
    } else if (meal.type === "supper") {
      supperCalories = totalCaloies;
    } else {
      dinnerCalories = totalCaloies;
    }

    if (
      index === array.length - 1 ||
      array[index].date !== array[index + 1].date
    ) {
      return (
        <div className={styles.table__row}>
          <div className={styles.table__day}>{meal.date}</div>
          <div className={styles.table__day}>{breakfastCalories}</div>
          <div className={styles.table__day}>{supperCalories}</div>
          <div className={styles.table__day}>{dinnerCalories}</div>
          <div className={styles.table__day}>
            {breakfastCalories + supperCalories + dinnerCalories}
          </div>
        </div>
      );
    }
  });

  return (
    <div className={styles.content}>
      <div className={styles.days}>
        <div className={styles.days__item}>Сегодня</div>
        <div className={styles.days__item}>7 дней</div>
        <div className={styles.days__item}>14 дней</div>
        <div className={styles.days__item}>30 дней</div>
      </div>
      <div className={styles.table}>
        <div className={styles.table__column}>
          <div className={styles.table__row}>
            <div className={styles.table__header}>Дата</div>
            <div className={styles.table__header}>Завтрак, кКал</div>
            <div className={styles.table__header}>Обед, кКал</div>
            <div className={styles.table__header}>Ужин, кКал</div>
            <div className={styles.table__header}>Итого, кКал</div>
          </div>
          {items}
        </div>
      </div>
    </div>
  );
};
