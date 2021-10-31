import React from 'react';

import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';

const MessageList: React.FC = () => {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="Logo DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            An example of a message
          </p>
          <div className={styles.messageUser}>
            <div>
              <img src="" alt="" />
            </div>
            <span>Ivan Seibel</span>
          </div>
        </li>
      </ul>
    </div>

  );
}

export default MessageList;