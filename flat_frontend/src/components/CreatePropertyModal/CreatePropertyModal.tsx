import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiOutlineClose } from "react-icons/ai";

interface NameValue {
  name: string;
  value: string;
}

const CreatePropertyModal = (props: any) => {
  const [property, SetProperty] = useState<NameValue[]>([]);

  const addProperty = () => {
    console.log("hii");
    SetProperty((prev) => [...prev, { name: "", value: "" }]);
    console.log(property);
  };

  const removeProperty = (index: any) => {
    let properties = [...property];
    properties.splice(index, 1);
    SetProperty(properties);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
          Add Properties
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Properties show up underneath your item, are clickable, and can be
          filtered in your collection's sidebar.
        </p>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="type">
              <Form.Label className="fs-5 fw-semibold">Type</Form.Label>
              <Form.Control type="text" placeholder="Charactor" />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label className="fs-5 fw-semibold">Name</Form.Label>
              <Form.Control type="text" placeholder="Male" />
            </Form.Group>
            <Col className="d-flex align-self-end">
              <Button variant="outline-secondary">
                <AiOutlineClose size={20} />
              </Button>
            </Col>
          </Row>
          {property.map((prop, index) => (
            <Row key={index} className="mb-3">
              <Form.Group as={Col} controlId="type">
                <Form.Control type="text" placeholder="Charactor" />
              </Form.Group>

              <Form.Group as={Col} controlId="name">
                <Form.Control type="text" placeholder="Male" />
              </Form.Group>
              <Col className="d-flex align-self-end">
                <Button
                  onClick={() => removeProperty(index)}
                  variant="outline-secondary"
                >
                  <AiOutlineClose size={20} />
                </Button>
              </Col>
            </Row>
          ))}
          <Button onClick={addProperty} variant="outline-primary">
            Add More
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          close
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePropertyModal;
