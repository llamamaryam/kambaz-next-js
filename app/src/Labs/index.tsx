"use client";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h2>Miguel Hernandez</h2>
      <h3>Section CS4550 01</h3>
      <h3>Tuesdays and Fridays from 3:25 to 5:05PM EST</h3>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
);}