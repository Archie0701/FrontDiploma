import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/login/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Login() {
  return <DynamicHeader />
}