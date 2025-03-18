import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  const getStoredBooks = () => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  };

  const [books, setBooks] = useState(getStoredBooks());
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchYear, setSearchYear] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleAddOrUpdateBook = (book, resetForm) => {
    let updatedBooks;
    if (editingBook) {
      updatedBooks = books.map((b) => (b.id === book.id ? book : b));
      setEditingBook(null);
    } else {
      updatedBooks = [...books, { ...book, id: Date.now() }];
    }
    setBooks(updatedBooks);
    resetForm(); // Reset form sau khi thêm sách
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e) => {
    setSearchYear(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchYear === "" || book.year.toString() === searchYear)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản Lý Sách</h1>

      <input
        type="text"
        placeholder="Tìm theo tiêu đề hoặc tác giả..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <input
        type="number"
        placeholder="Tìm theo năm xuất bản..."
        value={searchYear}
        onChange={handleYearChange}
        style={{ marginBottom: "20px", padding: "5px", width: "100%" }}
      />

      <BookForm onSave={handleAddOrUpdateBook} editingBook={editingBook} />
      <BookList books={filteredBooks} onEdit={handleEditBook} onDelete={handleDeleteBook} />
    </div>
  );
}

export default App;
