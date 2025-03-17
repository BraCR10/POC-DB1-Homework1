
"use client";

import React from "react";
import Board from "../components/Board";
import Button from "../components/Button";
import RowCard from "../components/RowCard";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Plantilla de Empleados</h1>
      <RowCard  id="ID" name="Nombre" salary="Salario" className="dashboard"/>
      <Board />
      <Button  label="Insertar" onClick={() => console.log("Hello clicked!!")} />
    </div>
  );
}
