import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult }from 'next'
import { parseCookies }from 'nookies'


export function canSSRGuest<P>(fn : GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);
    //Redirects user logged
    if(cookies['@nextauth.token']){
      return{
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}