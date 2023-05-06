import userData from "../meals"
import { MealTableListPage } from "./MealTableListPage"
import styles from "../App.module.css" 


export const MainPage = () =>{
  return(
    <div className={styles.content}>
    <div className={styles.menu}>
      <div>
        <button className={`${styles.menu__button} ${styles.menu__button__user} ${styles.menu__button__thin}`}>
          Ольга
        </button>
        <button className={`${styles.menu__button} ${styles.menu__button__rest} ${styles.menu__button__thick}`}>
          Осталось 1500 кКал
        </button>
        <button className={`${styles.menu__button} ${styles.menu__button__goal} ${styles.menu__button__thick}`}>
          Цель 2000 кКал
        </button>
      </div>
      <div>
        <button className={`${styles.menu__button} ${styles.menu__button__add} ${styles.menu__button__thin}`}>
          Добавить прием пищи
        </button>
        <button className={`${styles.menu__button} ${styles.menu__button__data} ${styles.menu__button__thin}`}>
          Мои данные
        </button>
        <button className={`${styles.menu__button} ${styles.menu__button__calc} ${styles.menu__button__thin}`}>
          Калькулятор калорий
        </button>
        <button className={`${styles.menu__button} ${styles.menu__button__exit} ${styles.menu__button__thin}`}>
          Выход
        </button>
      </div>
    </div>
    <div className="foodList">
      <MealTableListPage meals={userData.meals}></MealTableListPage>
    </div>
  </div>
  )
}