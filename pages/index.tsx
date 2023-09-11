import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import NextHead from "next/head";
import { RootState } from "../store";
import { deleteBook } from "../actions/books.action";
import AddBookModal from "../components/AddBook";
import EditBookModal from "../components/EditBook";

interface IBook {
  name: string;
  price: number;
  category: string;
  id: number;
}

const MainPage: React.FC = () => {
  const books: IBook[] = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const handleDeleteBook = (bookId: number) => {
    dispatch(deleteBook(bookId));
  };

  const handleEditBook = (bookId: number) => {
    setSelectedBook(books.find((book) => book.id === bookId));
    setShowEditModal(true);
  };

  return (
    <Container>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
        <title>Bookstore</title>
      </NextHead>
      <div>
        <h1 className="text-center mb-5 mt-3">Bookstore</h1>
        <Button
          className="float-end mb-3"
          onClick={() => setShowAddModal(true)}
        >
          Add Book
        </Button>
        <Table striped bordered className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: IBook) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.price}</td>
                <td>{book.category}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEditBook(book.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showAddModal && (
          <AddBookModal setShowAddModal={setShowAddModal} books={books} />
        )}
        {showEditModal && (
          <EditBookModal
            setShowEditModal={setShowEditModal}
            book={selectedBook}
          />
        )}
      </div>
    </Container>
  );
};
export default MainPage;
