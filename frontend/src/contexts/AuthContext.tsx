import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/apiClient';

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
   try{
    const response = await api.post('/session',{
      email,
      password,
    
    });
    const { id, name, token } = response.data;
    setCookie(undefined,'@nextauth.token',token, {
      maxAge: 60 * 60 * 24 * 30, //Expires one month
      path : "/"
    });

    setUser({
      id,
      name,
      email
    });

    // Pass to next requests our token
    api.defaults.headers['Authorization'] = `Bearer ${ token }`

    // Redirect our user to /dashboard
    Router.push('/dashboard');

   }catch(err){
    console.log("ERROR TO ACCESS",err);
   }
   
  }
  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut }}>
        { children }
    </AuthContext.Provider>
  )
}