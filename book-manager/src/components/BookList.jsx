  import React from "react";

  function BookList({ books, onEdit, onDelete }) {
    return (
      <div>
        <h2>Danh sách sách</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> - {book.author} ({book.year}){" "}
              <button onClick={() => onEdit(book)}>Sửa</button>
              <button onClick={() => onDelete(book.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default BookList;
