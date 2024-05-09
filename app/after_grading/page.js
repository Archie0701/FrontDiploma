import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/after_grading/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function After_Grading() {
  return <DynamicHeader />
}