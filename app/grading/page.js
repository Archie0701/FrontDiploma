import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/grading/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Grading() {
  return <DynamicHeader />
}