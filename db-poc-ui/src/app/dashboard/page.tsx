"use client";

import React, { useState } from "react";
import Board from "../components/Board";
import Button from "../components/Button";
import RowCard from "../components/RowCard";
import InsertEmployeePopup from "../components/InsertEmployeePopup";
import { insertEmployee } from "../services/insertEmployee";

export default function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInsertEmployee = async (name: string, salary: number) => {
    await insertEmployee(name, salary);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard">
      <h1>Plantilla de Empleados</h1>
      <RowCard id="ID" name="Nombre" salary="Salario" className="dashboard" />
      <Board key={refreshTrigger} />
      <Button label="Insertar" onClick={handleOpenPopup} />

      <InsertEmployeePopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleInsertEmployee}
      />

    <a href="https://github.com/BraCR10/POC-DB1-Homework1" target="_blank">
        <img src="https://commons.wikimedia.org/wiki/File:Github-desktop-logo-symbol.svg" alt="Go to GitHub" width="300">
    </a>
    </div>
  );
}
