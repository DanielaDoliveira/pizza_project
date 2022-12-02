import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { FiRefreshCw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"
import Modal from 'react-modal'
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
  id: string;
  table: string | number;
  status:boolean;
  draft: boolean;
  name:string | null
}
interface HomeProps{
  orders: OrderProps;
}

export type OrderItemProps ={
  id:string;
  amount:number;
  order_id:string;
  product_id:string;
  product:{
    id:string;
    name:string;
    description:string;
    price:string;
    banner: string;
  }
  order:{
    id:string;
    table:string | number;
    status:boolean;
    name:string | null;

  }
}
export default function Dashboard({ orders }: HomeProps) {

  const [orderList,setOrderList] = useState(orders || []);


    function handleCloseModal(){
      setModalVisible(false);
    }
  async function handleOpenModalView(id: string)
  {
    const api = setupAPIClient();
    const response = await api.get('/orders/detail',{
      params:{
        order_id: id,
      }
    });
    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id:string){
   const api = setupAPIClient();
   await api.put('/order/finish', {
    order_id: id
   });
   const response = await api.get('/orders');
   setOrderList(response.data);
   setModalVisible(false);
   
  }

  async function handleRefreshOrders(){
    const api = setupAPIClient();
    const response = await api.get('/orders');
    setOrderList(response.data);
  }

  Modal.setAppElement('#__next');
  const[modalItem,setModalItem] =useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);
  return(
    <>
    <Head>
      <title> Painel - Sujeito Pizzaria</title>
    </Head>
    <Header/>
    <main className= { styles.container }>
      <div className={ styles.containerHeader }>
        <h1>Últimos pedidos</h1>

        <button onClick={ handleRefreshOrders }>
          <FiRefreshCw size = { 25 }color = "#3fffa3"/>
        </button>


      </div>
      <article className = { styles.listOrderers }>
        {orderList.length === 0 &&(
            <span className =  { styles.emptyList }>Nenhum pedido aberto foi encontrado ... </span>
        )}
        {orderList.map(item => (
             <section 
             key = { item.id }
             className = { styles.orderItem }>
             <button onClick = { ()=>handleOpenModalView(item.id) }>
               <div className = { styles.tag }/>
               <span> Mesa {item.table } </span>
              
             </button>
           </section>
   
        ))}
       
      </article>

    {modalVisible &&(
      <ModalOrder
        isOpen = { modalVisible }
        onRequestClose = { handleCloseModal }
        order = { modalItem }
        handleFinishOrder = { handleFinishItem }
      
      />
    ) }
    </main>
      
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
 const response = await apiClient.get('/orders');
 console.log(response.data)
  
  return{
    props:{
      orders: response.data
    }
  }
})