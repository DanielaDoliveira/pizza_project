
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input';
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, FormEvent, useState } from 'react';
import Link from 'next/link';

interface eventProps extends React.FormEvent<HTMLInputElement>{}
export default function SignUp() {

  const { signIn } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();
    if(name === ''|| email === '' || password === ''){
      alert("DADOS NÃO PREENCHIDOS!");
      return;
    }
    setLoading(true);
  }
  return (
  <>
    <Head>
      <title>Sujeito Pizza - Faça seu cadastro agora!</title>
    </Head>
    <div className = {styles.containerCenter}>
      <Image src = {logoImg} alt = "Sujeito Pizzaria"/>
      <div className = {styles.login}>
        <h1> Criando sua conta </h1>
        <form onSubmit={ handleSignUp }>

        <Input
         placeholder = "Digite seu nome"
         value = { name }
         onChange = { (e)=> setName(e.target.value)}
         />
         <Input
         placeholder = "Digite seu email"
         value = { email }
         onChange = { (e)=> setEmail(e.target.value)}
         />

          <Input
         placeholder = "Sua senha"
         value = { password }
         onChange = { (e)=> setPassword(e.target.value)}
         />
         <Button
         type = "submit"
         loading={ loading }
         
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
