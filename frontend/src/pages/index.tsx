
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';

import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();
    if(email === '' || password === ''){
      alert("DADOS NÃO PREENCHIDOS!")
    }

    setLoading(true);
    let data = {
      email,
      password,
    }

    await signIn(data);
    setLoading(false);
  }
  return (
  <>
    <Head>
      <title>Sujeito Pizza - Faça seu login</title>
    </Head>
    <div className = {styles.containerCenter}>
      <Image src = {logoImg} alt = "Sujeito Pizzaria"/>
      <div className = {styles.login}>
        <form onSubmit = { handleLogin }>

         <Input
         placeholder = "Digite seu email"
         value = { email }
         onChange = {(e)=> setEmail(e.target.value)}
         />

          <Input
         placeholder = "Sua senha"
         value = { password }
         onChange = {(e)=> setPassword(e.target.value)}
         />
         <Button
         type = "submit"
         loading={ loading }
         > Acessar </Button>
        </form>

       <Link 
        className = {styles.text}
        href = "/signup">
          Não possui uma conta? Cadastre-se
       </Link>
      </div>
    </div>

  </>
  
  )
}
