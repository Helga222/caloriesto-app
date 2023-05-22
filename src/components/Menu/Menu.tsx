import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import image from "../../images/plant2.png";
import { useEffect, useRef, useState } from "react";
export const Menu = (props: {
  name: string;
  calorieGoal: number;
  onEditMeal: any;
  onLogout: any;
  curCalories: number;
  id: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hideMenu, setHideMenu] = useState(true);
  const [hideMenuRoutes, setHideMenuRoutes] = useState(["/", "/registration"]);

  const buttonRef = useRef(null);

  useEffect(() => {
    const hideMenu = hideMenuRoutes.includes(location.pathname);
    setHideMenu(hideMenu);
  }, [location, hideMenuRoutes]);

  if (hideMenu) return null;

  return (
    <div className={styles.menu} >
      <div className={styles.menu__item}>
        <button onClick={()=>navigate(`accounts/${props.id}`)} 
          className={`${styles.menu__button} ${styles.menu__button__user} ${styles.menu__button__thin}`}
        >
          <span className={styles.button__text}>{props.name}</span>
          <div className={styles.fill__container}></div>
        </button>
        <button
          className={`${styles.menu__button__disabled} ${styles.menu__button__rest} ${styles.menu__button__thick}`}
        >
          <span >
            Текущее количество: <span className={styles.menu__text}>{props.curCalories} кКал</span>
          </span>
        </button>
        <button
          className={`${styles.menu__button__disabled} ${styles.menu__button__goal} ${styles.menu__button__thick}`}
        >
          <span className={styles.button__text}>
            {props.calorieGoal
              ? `Норма: ${props.calorieGoal} кКал`
              : "Рассчитайте норму калорий в калькуляторе"}
          </span>
        </button>

        <button
          onClick={() => navigate(`/addmeal/${props.id}`)}
          className={`${styles.menu__button} ${styles.menu__button__goal} ${styles.menu__button__thin}`}
        >
          <span className={styles.button__text}>Добавить прием пищи</span>
          <div className={styles.fill__container}></div>
        </button>
        <button
          onClick={() => navigate(`/data/${props.id}`)}
          className={`${styles.menu__button} ${styles.menu__button__data} ${styles.menu__button__thin}`}
        >
          <span className={styles.button__text}>Мои данные</span>
          <div className={styles.fill__container}></div>
        </button>
        <button
          className={`${styles.menu__button} ${styles.menu__button__calc} ${styles.menu__button__thin}`}
          onClick={() => {
            navigate(`/calculator/${props.id}`);
          }}
        >
          <span className={styles.button__text}>Калькулятор калорий</span>
          <div className={styles.fill__container}></div>
        </button>

        <button
          onClick={props.onLogout}
          className={`${styles.menu__button} ${styles.menu__button__exit} ${styles.menu__button__thin}`}
        >
          <span className={styles.button__text}>Выход</span>
          <div className={styles.fill__container}></div>
        </button>
      </div>
      <div>
        <img className={styles.menu_img} src={image}></img>
      </div>
    </div>
  );
};
