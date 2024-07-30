import { FC, useState } from "react";
import styles from "../../styles/components/_modal-component.module.scss";

interface modalProps {
  onClose: () => void;
}

const ModalComponent: FC<modalProps> = (props) => {
  const { onClose } = props;
  const preventOnClose = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.darkBG} onClick={onClose}>
      <div className={styles.centered}>
        <div className={styles.modal} onClick={preventOnClose}></div>
      </div>
    </div>
  );
};

export default ModalComponent;
