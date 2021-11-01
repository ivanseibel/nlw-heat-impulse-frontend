import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut(): void;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
}

function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=94f1768ddae3e86fbd46`;

  const signIn = useCallback(async (githubCode: string) => {
    api.post<AuthResponse>('/authenticate', {
      code: githubCode,
    }).then((result) => {
      const { token, user } = result.data;

      localStorage.setItem('@dowhile:token', token);

      setUser(user);

      api.defaults.headers.common.authorization = `Bearer ${token}`;
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>('profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signInUrl,
      user,
      signOut,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };