import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/assigned/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Assigned() {
  return <DynamicHeader />
}