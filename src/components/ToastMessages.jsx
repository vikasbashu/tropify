import React from "react";
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const ToastMessage = (props) => {
    return (
        <>
            <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{ minHeight: '240px' }}
      >
        <ToastContainer
          className="p-3"
          position={"top-end"}
          style={{ zIndex: 1 }}
        >
          <Toast bg={props.type}>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{props.type}</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
        </>
    );
}