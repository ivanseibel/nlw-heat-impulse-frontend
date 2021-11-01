import React, { useContext, useState, useEffect, useCallback, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';

import styles from './styles.module.scss';

const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');

  const { user, signOut } = useContext(AuthContext);

  const handleSendMessage = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }

    api.post('messages', { text: message }).then((result) => {
      setMessage('');
    });
  }, [message]);

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>
          {user?.name}
        </strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>
      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="What about your expectation for the event?"
          onChange={(e) => { setMessage(e.target.value) }}
          value={message}
        />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
}

export default SendMessageForm;