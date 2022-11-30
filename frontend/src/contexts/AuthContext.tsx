import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps)=> Promise<void>;
  signOut:()=> void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email:string;
  password:string;
}
type AuthProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext( {} as AuthContextData );

export function signOut(){
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  }catch{
    console.log( "Error to logout");
  }
}
export function AuthProvider({ children }: AuthProviderProps){
  const [ user, setUser ] = useState<UserProps>();
  const isAuthenticated = !!user;
  async function signIn({ email, password }: SignInProps){
    alert("Login: "+ email);
  }
  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut }}>
        { children }
    </AuthContext.Provider>
  )
}