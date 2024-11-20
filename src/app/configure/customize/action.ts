'use server'

import { db } from '@/db'

export async function saveCostomization({
    image,
    allTextElements
}: any) {
  const {id} = await db.customizedDesign.create({
    data: {
      image: image,
      customizedTextElements: {
        createMany: {
          //@ts-ignore
          data:  allTextElements
        }
      },
    }
})

    return id;
}
