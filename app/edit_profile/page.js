import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../components/edit_profile/page'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
 
export default function Edit_Profile() {
  return <DynamicHeader />
}