
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';

import Link from 'next/link';
export default function Home() {
  return (
  <>
    <Head>
      <title>Sujeito Pizza - Faça seu login</title>
    </Head>
    <div className = {styles.containerCenter}>
      <Image src = {logoImg} alt = "Sujeito Pizzaria"/>
      <div className = {styles.login}>
        <form>

         <Input
         placeholder = "Digite seu email"
         />

          <Input
         placeholder = "Sua senha"
         />
         <Button
         type = "submit"
         loading={ false }
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
