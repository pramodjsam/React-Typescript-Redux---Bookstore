import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editBook } from "../actions/books.action";

interface IBook {
  name: string;
  price: number;
  category: string;
  id: number;
}

interface IEditBookProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  book: IBook;
}

const EditBookModal = ({ setShowEditModal, book }: IEditBookProps) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [editedBook, setEditedBook] = useState<IBook>(book);

  const handleEditBook = () => {
    if (Object.values(editedBook).includes("")) {
      setValidated(true);
    } else {
      setValidated(false);
      dispatch(editBook(editedBook));
      setShowEditModal(false);
    }
  };

  return (
    <Modal show={true} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              value={editedBook.name}
              onChange={(e) =>
                setEditedBook({ ...editedBook, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book category"
              value={editedBook.category}
              onChange={(e) =>
                setEditedBook({ ...editedBook, category: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter book price"
              value={editedBook.price || 0}
              onChange={(e) =>
                setEditedBook({
                  ...editedBook,
                  price: parseInt(e.target.value),
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditBook}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
