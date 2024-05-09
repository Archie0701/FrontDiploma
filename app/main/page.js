import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/main/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Main() {
  return <DynamicHeader />
}