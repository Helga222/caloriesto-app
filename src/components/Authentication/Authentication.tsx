import styles from "./Authentication.module.css";
export const Authentication = (props: any) => {
  const handleChange = (event: any) => {
    props.onHandleInputs(event);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.onHandleSubmit();
  };

  return (
    <div className={styles.content}>
      <h1>Форма регистрации</h1>
      <div className={styles.auth__form}>
    
        <div className={styles.form__content}>
          {props.registration && (
            <div className={styles.auth__row}>
              <div className={styles.auth__column}>
                <label className={styles.auth__login}>Имя:</label>
              </div>
              <div className={styles.auth__column}>
                <input
                  type="text"
                  name="name"
                  className={styles.auth__input} required
                  placeholder="никнейм"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className={styles.auth__row}>
            <div className={styles.auth__column}>
              <label className={styles.auth__login}>Электронная почта:</label>
            </div>
            <div className={styles.auth__column}>
              <input
                type="text"
                name="email"
                className={styles.auth__input}
                placeholder="почта"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.auth__row}>
            <div className={styles.auth__column}>
              <label className={styles.auth__login}>Пароль: </label>
            </div>
            <div className={styles.auth__column}>
              <input
                type="password"
                className={styles.auth__input}
                name="password"
                placeholder="пароль"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.auth__row}>
            <button onClick={handleSubmit} className={styles.auth__button}>
              {props.registration ? "Зарегестрироваться" : "Войти"}
            </button>
          </div>
          </div>
      </div>
    </div>
  );
};
