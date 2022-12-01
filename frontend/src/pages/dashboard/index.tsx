import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"

export default function Dashboard() {
  return(
    <>
      <title> Painel - Sujeito Pizzaria</title>
      <Header/>

      
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return{
    props:{}
  }
})