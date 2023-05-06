import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MealTable } from "./components/MealTable/MealTable";
import { MealTableList } from "./components/MealTableList/MealTableList";
import meals from "./meals";
import userData from "./meals";
import { AddMeal } from "./components/AddMeal/AddMeal";
import { MealTableListPage } from "./pages/MealTableListPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter >
      <div className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/addmeal" element={<AddMeal />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
