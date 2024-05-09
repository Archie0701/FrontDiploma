import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/slider/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Slider() {
  return <DynamicHeader />
}