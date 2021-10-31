import React, { useCallback, useContext, useEffect } from 'react';

import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../services/api';

import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/auth';

const LoginBox: React.FC = () => {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>
        Enter and share your message
      </strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Sign in with Github
      </a>
    </div>

  );
}

export default LoginBox;