import { useEffect, useState } from "react";
import { MealList } from "../../meals";
import styles from "./Data.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useParams } from "react-router-dom";

export const Data = (props: MealList) => {
  const {id} = useParams();
  const currentDate = new Date();
  const endDate = new Date();

  const [mealListArray, setMealListArray] = useState<MealList[]>([
    { meals: props.meals, date:props.date,userId:id },
  ]);
  const [selectedDays,setSelectedDays] = useState('0');

  const handleChange=(event:any)=>{
    setSelectedDays(event.target.value);
  }

  const createQuery = () =>{

  }

  const calcDate = () => {
    endDate.setDate(currentDate.getDate() - Number(selectedDays));
    
    return endDate.toLocaleDateString();
  };

  useEffect(() => {
    getMealListArray();
  }, [selectedDays]);

  const getMealListArray = async () => {
  const productsRef = collection(database, "mealDayList");
  let q;
  if (selectedDays==='0'){
    q= query(
      productsRef,
      where("date", "==", currentDate.toLocaleDateString()),
      where("userId", "==", id));
  }
  else {
    q = query(
      productsRef,
      where("date", "<=", currentDate.toLocaleDateString()),
      where("date", ">", calcDate()),
      where("userId", "==", id)
    );
  }


    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setMealListArray(newData as MealList[]);
    });
  };

  const list = mealListArray.map((mealList) => {
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
      return <div className={styles.table__day}>{totalCaloies}</div>;
    });
    return (
      <div className={styles.table__row}>
        <div className={styles.table__day}>{mealList.meals[0].date}</div>
        {meals}
        <div className={styles.table__day}>{resultCalories}</div>
      </div>
    );
  });

  return (
    <div className={styles.content}>
      <div className={styles.days}>
        <div className={styles.days__item}>
          <input type="radio" id="contactChoice1" name="contact" onChange={handleChange}  value="0" />
          <label htmlFor="contactChoice1">Сегодня</label>
        </div>
        <div className={styles.days__item}>
        <input type="radio" id="contactChoice1" name="contact" onChange={handleChange} value="7" />
        <label htmlFor="contactChoice1">7 дней</label>
        </div>
        <div className={styles.days__item}>
        <input type="radio" id="contactChoice1" name="contact"  onChange={handleChange} value="14" />
        <label htmlFor="contactChoice1">14 дней</label>
        </div>
        <div className={styles.days__item}>
        <input type="radio" id="contactChoice1" name="contact"onChange={handleChange} value="30" />
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
