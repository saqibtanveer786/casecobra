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
  // const {id} = searchParams;
  const id = "cm3e375q8000014ah9v4reci1"

  if(!id || typeof id !== 'string'){
    return notFound();
  }

  const customizedDesign = await db.customizedDesign.findUnique({
    where: { id },
    select: {
      id: true,
      image: true,
      customizedTextElements: true
    }
  })

  // const customizedDesign = {
  //   id: "2",
  //   // image: "https://utfs.io/f/68023458-e661-43d7-b722-d3118312811d-c5gn3t.png",
  //   image: "/desdes.png",
  //   customizedTextElements: [
  //     {
  //       id: "1",
  //       title: "name",
  //       content: "name",
  //       top: 100,
  //       left: 100,
  //       fontSize: 23,
  //       fontColor: "black",
  //       fontFamily: "Arial",
  //     }
  //   ]
  // }

  if(!customizedDesign) return notFound();
  
  //@ts-ignore
  return <CustomizedDesignPreview customizedDesign={customizedDesign}/>
}

export default Page
