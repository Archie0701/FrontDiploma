import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/registration/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Registration() {
  return <DynamicHeader />
}