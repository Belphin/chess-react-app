import React, { FC, PropsWithChildren } from "react";

interface ModalProps {}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children }) => {
	return <div className="modal">{children}</div>;
};

export default Modal;
