import React, { useState, useEffect } from "react";
import ItemList from "./component/ItemList";
import "./App.css";

const initialItems = [
  { id: 1, title: "Learn React ", category: "Learning" },
  { id: 2, title: "by groceries", category: "Personal" },
  { id: 3, title: "Read a Book", category: "Personal1" },
  { id: 4, title: "Practice algorithms", category: "Learning" },
  { id: 5, title: "Gym workout", category: "Health" },
];

export default function App() {
  const [items] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  // load saved filter from Localstorage once on mount
  useEffect(() => {
    const savedSearch = localStorage.getItem("search") || "";
    const savedCategory = localStorage.getItem("category") || "All";
    setSearch(savedSearch);
    setCategory(savedCategory);
  }, []);
  // saved filtered when they changed
  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("category", category);
  }, [search, category]);
  // derived filtered list (fast, pure)
  const filtered = items
    .filter((item) => (category === "All" ? true : item.category === category))
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  // reset filter(but keep item )
  const handleReset = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <div className="container">
      <h1>Search & Filter Demo</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="">Learning</option>
          <option value="">Personal</option>
          <option value="">Health</option>
        </select>

        <button onClick={handleReset}>Reset</button>
      </div>
      <ItemList items={filtered} />
    </div>
  );
}
