import React from 'react';

import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';

const LoginBox: React.FC = () => {
  return (

    <div className={styles.loginBoxWrapper}>
      <strong>
        Enter and share your message
      </strong>
      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Sign in with Github
      </a>
    </div>

  );
}

export default LoginBox;