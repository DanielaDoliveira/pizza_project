
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input';
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, FormEvent } from 'react';
import Link from 'next/link';

interface eventProps extends React.FormEvent<HTMLInputElement>{}
export default function SignUp() {

 
  return (
  <>
    <Head>
      <title>Sujeito Pizza - Faça seu cadastro agora!</title>
    </Head>
    <div className = {styles.containerCenter}>
      <Image src = {logoImg} alt = "Sujeito Pizzaria"/>
      <div className = {styles.login}>
        <h1> Criando sua conta </h1>
        <form >

        <Input
         placeholder = "Digite seu nome"
         />
         <Input
         placeholder = "Digite seu email"
         />

          <Input
         placeholder = "Sua senha"
         />
         <Button
         type = "submit"
         loading={ false }
         > Cadastrar </Button>
        </form>

       <Link 
        className = {styles.text}
        href = "/">
         Já possui uma conta? Faça login !
       </Link>
      </div>
    </div>

  </>
  
  )
}
