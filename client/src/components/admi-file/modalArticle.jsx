import React, { Component } from "react";
import Modal from "react-modal";
class ModalArticle extends Component {
  state = { show: false, setShow: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  //const [show, setShow] = useState(false);
  show = false;
  setShow = false;

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: false });

  render() {
    return (
      <React.Fragment>
        <button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </button>

        <Modal show={this.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={this.handleClose}>
              Close
            </button>
            <button variant="primary" onClick={this.handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  /*render() {
    return (
      <main>
        <h1>React Modal</h1>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal>
        <button type="button" onClick={this.showModal}>
          open
        </button>
      </main>
    );
  }*/
}

export default ModalArticle;
