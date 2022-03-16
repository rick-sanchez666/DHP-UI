import react from "react";
import errorclasses from './Modal.module.css';
import ReactDOM from 'react-dom';



const Modal = (props) => {

    return (
        <div className={errorclasses.backdrop}>
            <div className={errorclasses.card}>
                <header className={errorclasses.header}>
                    {props.title}
                </header>
                <div className={errorclasses.content}>
                    {props.children}
                </div>
                <footer className={errorclasses.actions}>
                <button className="btn btn-sm btn-secondary" onClick={props.onModalClose}>Close</button>
                </footer>
            </div>
        </div>

    )
}

export default Modal