import Head from "next/head"
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss';


export default function Category() {
  
  const [name, setName ] = useState('');
  async function handleRegister(event : FormEvent) {
    event.preventDefault();
    if (name === ''){
      return;
    }
    const api = setupAPIClient();
    await api.post('./category',{
      name : name
    })
    setName('');
    toast.success("Categoria cadastrada com sucesso! ")
    
  }
  return(
    <>
    <Head>
      <title> Nova Categoria - Sujeito Pizzaria </title>
    </Head>
    <Header/>

    <main className={ styles.containers }>
      <h1> Cadastrar categorias </h1>
      <form className={ styles.form } onSubmit={ handleRegister }>
        <input 
        type="text"
        placeholder="Digite o nome da categoria"
        className = { styles.input }
        value = { name }
        onChange={ (e)=> setName(e.target.value)}
        />
        <button 
        type = "submit"
        className = { styles.buttonAdd}
        >
          Cadastrar
        </button>
      </form>
    </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async()=>{
  return {
    props:{}
  }
})