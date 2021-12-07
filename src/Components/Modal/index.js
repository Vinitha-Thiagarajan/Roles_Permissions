import './styles.css';
import React, { useState } from "react";

const Modal = ({ handleClose, show, children,Title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
      <Title/>
      <section>
        {children}
      </section>
      </div>
    </div>
  );
};

export default Modal;