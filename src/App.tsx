import React from "react";
import styles from "./App.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddMealPage } from "./pages/AddMealPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";

function App() {
  return (
    <BrowserRouter >
      <div className={styles.wrapper}>
        <Routes>
          <Route path="/accounts/id" element={<MainPage />} />
          <Route path="/addmeal" element={<AddMealPage />} />
          <Route path="/" element={<AuthenticationPage />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
