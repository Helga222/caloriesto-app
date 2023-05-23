import { MealTable } from "../MealTable/MealTable";
import styles from "./AddMeal.module.css";
import { Meal, Product } from "../../types";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import image from "../../images/pancake.png";

export const AddMeal = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productsSearch, setProductsSearch] = useState<any>([]);

  const [selectedProduct, setSelectedProd] = useState<Product>();

  const [meal, setMeal] = useState<Meal>({
    type: props?.meal?.type || "Завтрак",
    date: props?.meal?.date || props.date,
    products: props?.meal?.products || [],
  });

  const list = productsSearch.map((item: any, index: number) => (
    <option key={index} value={index}>
      {item.name}
    </option>
  ));

  const handleInput = (event: any) => {
    if (productsSearch && productsSearch.length > 0) {
      const index = event.target.value;
      setSelectedProd(productsSearch[index]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const productsRef = collection(database, "products");
    await getDocs(productsRef).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setProductsSearch(newData as Product[]);
      setTimeout(() => setSelectedProd(newData[0] as Product), 0);
    });
  };

  const handleAddMeal = () => {
    props.onHandleClick(meal);
    navigate(`/accounts/${id}`);
  };

  const handleDeleteProduct = (index: number) => {
    const newProducts = [...meal.products];
    newProducts.splice(index, 1);
    setMeal({ ...meal, ...{ products: newProducts } });
  };

  const handleSubmit = () => {
    if (selectedProduct) {
      setMeal({
        ...meal,
        ...{ products: [...meal.products, selectedProduct] },
      });
    }
  };

  return (
    <div className={styles.meal__form}>
      <div className={styles.meal__navlink}>
        <NavLink to={`/accounts/${id}`}>назад</NavLink>
      </div>
      <div className={styles.meal__board}>
        <img className={styles.meal__img} src={image} alt="" />
        Тип приема пищи:
        <select
          className={styles.meal__select}
          value={meal.type}
          onChange={(event: any) =>
            setMeal({ ...meal, ...{ type: event.target.value } })
          }
        >
          <option>Завтрак</option>
          <option>Обед</option>
          <option>Ужин</option>
        </select>
      </div>
      <div className={`${styles.meal__board} ${styles.flex__column}`}>
        <select
          className={styles.meal__input__product}
          placeholder="Выберите из списка"
          onChange={handleInput}
          id="productName"
        >
          {list}
        </select>
        <div className={styles.flex__row}>
          <button className={styles.meal__button} onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
      <div className={styles.meal__table}>
        <MealTable
          products={meal.products}
          deletable={meal.products.length}
          type={meal.type}
          onDeleteClick={handleDeleteProduct}
        />
      </div>
      <div className={styles.flex__row}>
        <button className={styles.meal__button} onClick={handleAddMeal}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
