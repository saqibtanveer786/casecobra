import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignCustomizer from './DesignCustomizer'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {

  return (
    <DesignCustomizer />
  )
}

export default Page
