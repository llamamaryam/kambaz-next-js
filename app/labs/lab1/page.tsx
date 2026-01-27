import React from "react"
export default function HtmlLabPage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>

      {/* Navigation – Anchor Tags + SPA Navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <a href="#headings" style={{ marginRight: "15px" }}>Headings</a>
        <a href="#lists" style={{ marginRight: "15px" }}>Lists</a>
        <a href="#table" style={{ marginRight: "15px" }}>Table</a>
        <a href="#images" style={{ marginRight: "15px" }}>Images</a>
        <a href="#form">Form</a>
      </nav>

      {/* Headings + Paragraph */}
      <section id="headings">
        <h1>Welcome to My HTML Lab</h1>
        <h2>Learning Basic HTML Tags</h2>
        <h3>By Maryam</h3>

        <p>
          This page demonstrates headings, paragraphs, lists, tables, images,
          forms, anchor tags, and navigation in a single-page application.
        </p>
      </section>

      {/* Lists */}
      <section id="lists">
        <h2>My Favorite Recipe (Ordered List)</h2>
        <ol>
          <li>Boil pasta</li>
          <li>Prepare sauce</li>
          <li>Mix pasta and sauce</li>
          <li>Add cheese</li>
        </ol>

        <h2>My Favorite Books (Unordered List)</h2>
        <ul>
          <li>The Hunger Games</li>
          <li>Harry Potter</li>
          <li>Percy Jackson</li>
          <li>The Book Thief</li>
        </ul>
      </section>

      {/* Table */}
      <section id="table">
        <h2>Quiz Scores</h2>
        <table
          style={{ borderCollapse: "collapse", marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Quiz
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Q3", "02/01/2026", 85],
