import styles from "./Authentication.module.css";
export const Authentication = () => (
  <div className={styles.content}>
    <h1>Форма регистрации</h1>
    <form action="" className={styles.auth__form}>
      <div className={styles.form__content}>
        <div className={styles.auth__row}>
          <div className={styles.auth__column}>
            <label className={styles.auth__login}>Логин:</label>
          </div>
          <div className={styles.auth__column}>
            <input
              type="text"
              className={styles.auth__input}
              placeholder="логин"
            />
          </div>
        </div>
        <div className={styles.auth__row}>
          <div className={styles.auth__column}>
            <label className={styles.auth__login}>Пароль: </label>
          </div>
          <div className={styles.auth__column}>
            <input
              type="text"
              className={styles.auth__input}
              placeholder="пароль"
            />
          </div>
        </div>
        <div className={styles.auth__row}>
          <button type="submit" className={styles.auth__button}>
            Войти
          </button>
        </div>
      </div>
    </form>
  </div>
);
