import React, { useState, useEffect } from "react";

function BookForm({ onSave, editingBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setYear("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !year.trim()) return;

    onSave({ id: editingBook?.id || Date.now(), title, author, year }, resetForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tiêu đề sách"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tác giả"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Năm xuất bản"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">{editingBook ? "Cập nhật" : "Thêm sách"}</button>
    </form>
  );
}

export default BookForm;
