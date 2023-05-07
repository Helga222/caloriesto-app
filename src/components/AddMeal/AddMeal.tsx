import { MealTable } from "../MealTable/MealTable";
import styles from "./AddMeal.module.css";
import { breakfast } from "../../meals";
export const AddMeal = () => {
  return (
    <form className={styles.meal__form}>
      <div className={styles.meal__board}>
        Тип приема пищи:
        <select>
          <option>Завтрак</option>
          <option>Обед</option>
          <option>Ужин</option>
        </select>
      </div>
      <div className={`${styles.meal__board} ${styles.flex__column}`}>

          <input
            type="text"
            className={styles.meal__input__product}
            placeholder="Введите название продукта"
          />
        <div className={styles.flex__row}>
          <input
            type="text"
            className={styles.meal__input__count}
            placeholder="Количество"
          />
          грамм
          <button className={styles.meal__button}>Добавить</button>
        </div>

      </div>
      <div className={styles.meal__table}>
        <MealTable date={breakfast.date} id={breakfast.id} products={breakfast.products} type={breakfast.type}></MealTable>
      </div>
    </form>
  );
};
