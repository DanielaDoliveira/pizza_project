import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify'
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps)=> Promise<void>;
  signOut:()=> void;
  signUp:(credentials: SignUpProps)=> Promise<void>;
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
type SignUpProps = {
  name:string;
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

  useEffect(()=>{
    const { '@nextauth.token' : token} = parseCookies();
    if(token){
      api.get('/me').then(response => {
        const { id, name, email } = response.data;
        setUser({
          id,
          name,
          email
        });
      }).catch(()=>{
        signOut();
      })
    }
  },[])
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
    toast.success("Login bem sucedido! ")
   }catch(err){
    toast.error("N??o foi poss??vel fazer login");
   }
   
  }

  async function signUp({ name, email, password } : SignUpProps){
    try {
      const response = api.post('/users',{ 
        name, 
        email, 
        password});
      toast.success( "Conta criada com sucesso!");
      Router.push('/');
    } catch (error) {
      toast.error("Erro ao registrar conta");
    }
  }
  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut, signUp }}>
        { children }
    </AuthContext.Provider>
  )
}