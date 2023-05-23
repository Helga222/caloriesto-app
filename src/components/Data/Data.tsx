import { useEffect, useState } from "react";
import { MealList } from "../../types";
import styles from "./Data.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { NavLink, useParams } from "react-router-dom";
import { mealConverter } from "../../converters";

export const Data = (props: MealList) => {
  const { id } = useParams();
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const [mealListArray, setMealListArray] = useState<MealList[]>([
    {
      meals: props.meals,
      date: props.date,
      userId: id,
      allCalories: props.allCalories,
    },
  ]);
  const [selectedDays, setSelectedDays] = useState("0");

  const handleChange = (event: any) => {
    setSelectedDays(event.target.value);
  };

  const calcDate = () => {
    endDate.setDate(currentDate.getDate() - Number(selectedDays));

    return endDate;
  };

  useEffect(() => {
    getMealListArray();
  }, [selectedDays]);

  const getMealListArray = async () => {
    const productsRef = collection(database, "mealDayList").withConverter(
      mealConverter
    );
    let q;
    if (selectedDays === "0") {
      q = query(
        productsRef,
        where("date", "==", currentDate),
        where("userId", "==", id)
      );
    } else {
      q = query(
        productsRef,
        where("date", "<=", currentDate),
        where("date", ">", calcDate()),
        where("userId", "==", id)
      );
    }

    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc, i) => ({ ...doc.data() }));
      setMealListArray(newData as MealList[]);
    });
  };

  const list = mealListArray.map((mealList, i) => {
    mealList.meals.sort((a, b) =>
      a.type > b.type ? 1 : b.type > a.type ? -1 : 0
    );
    let resultCalories = 0;
    const meals = mealList.meals.map((meal) => {
      let totalCaloies = meal.products.reduce(
        (acc, item) => acc + item.calories,
        0
      );
      resultCalories = resultCalories + totalCaloies;
      return (
        <div key={meal.type} className={styles.table__day}>
          {totalCaloies}
        </div>
      );
    });
    return (
      <div key={i} className={styles.table__row}>
        <div className={styles.table__day}>
          {mealList.date.toLocaleDateString()}
        </div>
        {meals}
        <div className={styles.table__day}>{resultCalories}</div>
      </div>
    );
  });

  return (
    <div className={styles.content}>
      <div className={styles.days__nav}>
        <NavLink to={`/accounts/${id}`}>назад</NavLink>
      </div>

      <div className={styles.days}>
        <div className={styles.days__item}>
          <input
            type="radio"
            checked={selectedDays === "0" ? true : false}
            id="contactChoice1"
            name="contact"
            onChange={handleChange}
            value="0"
          />
          <label htmlFor="contactChoice1">Сегодня</label>
        </div>
        <div className={styles.days__item}>
          <input
            type="radio"
            checked={selectedDays === "7" ? true : false}
            id="contactChoice1"
            name="contact"
            onChange={handleChange}
            value="7"
          />
          <label htmlFor="contactChoice1">7 дней</label>
        </div>
        <div className={styles.days__item}>
          <input
            type="radio"
            checked={selectedDays === "14" ? true : false}
            id="contactChoice1"
            name="contact"
            onChange={handleChange}
            value="14"
          />
          <label htmlFor="contactChoice1">14 дней</label>
        </div>
        <div className={styles.days__item}>
          <input
            type="radio"
            checked={selectedDays === "30" ? true : false}
            id="contactChoice1"
            name="contact"
            onChange={handleChange}
            value="30"
          />
          <label htmlFor="contactChoice1">30 дней</label>
        </div>
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
          {list}
        </div>
      </div>
    </div>
  );
};
