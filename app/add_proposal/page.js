import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/add_proposal/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Add_Proposal() {
  return <DynamicHeader />
}