import styles from "./Calculator.module.css";


export const Calculator = () => {


  return (
    <div className={styles.calc__content}>
      <div className={styles.calc__text}>
        Калькулятор калорий позволит вам рассчитать то количество энергии,
        которое необходимо ежедневно получать вашему организму в зависимости от
        вашего роста, веса, возраста и степени физической активности (норма
        калорий).
      </div>
      <form action="" className={styles.calc__form}>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Пол:</label>
          <select className={styles.calc__input}>пол
            <option>мужской</option>
            <option>женский</option>
          </select>
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Возраст:</label>
          <input
            className={styles.calc__input}
            type="text"
            placeholder="возраст"
          />
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Рост:</label>
          <input
            className={styles.calc__input}
            type="text"
            placeholder="рост"
          />
        </div>
        <div className={styles.calc__row}>
          <label className={styles.calc__label}>Вес:</label>
          <input className={styles.calc__input} type="text" placeholder="вес" />
        </div>
        <button className={styles.calc__button}>
          Рассчитать количество калорий в день
        </button>
        <div className={styles.calc__value}>1278 kKal</div>  
      </form>
    </div>
  );
};
