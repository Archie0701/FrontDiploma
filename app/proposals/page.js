import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/proposals/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Proposals() {
  return <DynamicHeader />
}