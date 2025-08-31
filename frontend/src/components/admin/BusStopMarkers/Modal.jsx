import './Modal.css';
import Form from "./Form";

const Modal = ({currStop, show, onClose,setStops,mode }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <Form Stop={currStop} setStops={setStops} mode={mode}/>
        </div>
      </div>
    </div>
  );
};

export default Modal;
