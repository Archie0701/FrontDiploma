import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/identify_problem/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Identify() {
  return <DynamicHeader />
}