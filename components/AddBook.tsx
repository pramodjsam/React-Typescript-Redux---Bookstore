import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBook } from "../actions/books.action";

interface IBook {
  name: string;
  price: number;
  category: string;
  id: number;
}

interface IAddBookProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  books: IBook[];
}

const AddBookModal = ({ setShowAddModal, books }: IAddBookProps) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleAddBook = () => {
    if (Object.values(book).includes("")) {
      setValidated(true);
    } else {
      setValidated(false);
      dispatch(addBook({ id: books.length, ...book }));
      setShowAddModal(false);
    }
  };

  return (
    <Modal show={true} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              value={book.name}
              required={true}
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book category"
              value={book.category}
              required
              onChange={(e) => setBook({ ...book, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter book price"
              value={book.price}
              required
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBookModal;
