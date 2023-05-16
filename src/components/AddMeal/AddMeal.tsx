import { MealTable } from "../MealTable/MealTable";
import styles from "./AddMeal.module.css";
import { Meal, Product} from "../../meals";
import { database } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AddMeal = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productsSearch, setProductsSearch] = useState<any>([]);

  const [selectedProduct, setSelectedProd] = useState<Product>();

  const [meal, setMeal] = useState<Meal>({
    type: props?.meal?.type || "Завтрак",
    date: props?.meal?.date || props.date,
    products: props?.meal?.products || [],
    userId: id || "",
  });

  const list = productsSearch.map((item: any, index: number) => (
    <option value={index}>{item.name}</option>
  ));

  const handleInput = (event: any) => {
    getProducts();
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
    //const q = query(productsRef, where("name", ">=", value));
    await getDocs(productsRef).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setProductsSearch(newData as Product[]);
      console.log(productsSearch, newData);
    });
    //await setSelectedProd(productsSearch[0])
  };

  const handleAddMeal = () => {
    props.onHandleClick(meal);
    navigate(`/accounts/${id}`);
  };

  const handleDeleteProduct = (index: number) => {
    const newProducts = meal.products.filter(
      (item) => item !== meal.products[index]
    );
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
      <div className={styles.meal__board}>
        Тип приема пищи:
        <select
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
        {/* <input
          type="search"
          list="productName"
          className={styles.meal__input__product}
          placeholder="Введите название продукта"
          onChange={handleInput}
  />*/}
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
        ></MealTable>
      </div>
      <div className={styles.flex__row}>
        <button className={styles.meal__button} onClick={handleAddMeal}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
