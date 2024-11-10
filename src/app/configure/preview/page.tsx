import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'
import CustomizedDesignPreview from './CustomizedDesignPreview'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  // const { id } = searchParams

  // if (!id || typeof id !== 'string') {
  //   return notFound()
  // }

  // const configuration = await db.configuration.findUnique({
  //   where: { id },
  // })

  // if(!configuration) {
  //   return notFound()
  // }

  // return <DesignPreview configuration={configuration} />
  // customized design id
  const {id} = searchParams;

  if(!id || typeof id !== 'string'){
    return notFound();
  }

  const customizedDesign = await db.customizedDesign.findUnique({
    where: { id }
  })

  if(!customizedDesign) return notFound();
  

  return <CustomizedDesignPreview customizedDesign={customizedDesign}/>
}

export default Page
