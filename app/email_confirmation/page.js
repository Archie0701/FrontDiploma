import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/email_confirmation/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Email_Confirmation() {
  return <DynamicHeader />
}