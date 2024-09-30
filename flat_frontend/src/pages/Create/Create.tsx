import Container from "react-bootstrap/Container";
import Style from "./Create.module.css";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import CreatePropertyModal from "../../components/CreatePropertyModal/CreatePropertyModal";

const Create = () => {
  const [modalShow, setModalShow] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    mediaInputRef.current?.click();
  };
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <section>
      <Container className="p-5">
        <header>
          <h1 className="fw-bold lh-base">Create New Item</h1>
        </header>
        <Form>
          <p className="text-muted">&#42; Required fields</p>
          <Form.Group>
            <Form.Label className="fs-5 mb-0 fw-semibold">
              Images, Video, Audio, or 3D Model
            </Form.Label>
            <Form.Text className="d-block mb-3">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </Form.Text>
            <Form.Control
              hidden
              as="input"
              type="file"
              ref={mediaInputRef}
              onChange={handleFiles}
            ></Form.Control>
            <div className={Style.media} onClick={handleClick}>
              <i className="opacity-50">
                <BsFillImageFill size={60} />
              </i>
            </div>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fs-5 fw-semibold">Email address</Form.Label>
            <Form.Control
              name="itemName"
              size="lg"
              type="text"
              placeholder="Item name"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fs-5 mb-0 fw-semibold">
              Description
            </Form.Label>
            <Form.Text className="d-block mb-3">
              The description will be included on the item's detail page
              underneath its image.
            </Form.Text>
            <Form.Control
              name="description"
              size="lg"
              as="textarea"
              rows={3}
              placeholder="Provide a detailed description of your item."
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fs-5 mb-0 fw-semibold">
              Collection
            </Form.Label>
            <Form.Text className="d-block mb-3">
              This is the collection where your item will appear.
            </Form.Text>
            <Form.Select
              name="collection"
              size="lg"
              placeholder="Select collection"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <section>
            <div className="d-flex align-items-center justify-content-between py-3">
              <div className="d-flex">
                <div className="mt-1">
                  <AiOutlineUnorderedList size={20} />
                </div>
                <div className="ms-3">
                  <span className="fs-5 fw-semibold">Properties</span>
                  <p>Textual traits that show up as rectangles</p>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => setModalShow(true)}
                  variant="outline-secondary"
                >
                  <BiPlus size={20} />
                </Button>
                <CreatePropertyModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          </section>
          <Button
            className="px-4 py-3 rounded-4 mt-5"
            variant="primary"
            size="lg"
          >
            Create
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Create;
