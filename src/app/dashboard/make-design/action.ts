"use server"

import { db } from "@/db"
import { TextElement } from "@prisma/client"

type Design = {
    previewImg: string,
    mainImg: string,
    textElements: TextElement[]
}

export const makeDesignInDB = async (design: Design)=> {
    try {
        const {previewImg, mainImg, textElements} = design
        if(!textElements) throw new Error("Please Provide Text Elements")

    const madeDes = await db.design.create({
        data: {
            previewImg,
            mainImg,
            textElements: {
                createMany: {
                    data: textElements
                }
            }
        }
    })
    
    if (!madeDes) throw new Error("Something went wrong!")

    return madeDes
        
    } catch (e) {
        throw new Error("Something Went Wrong In Action!")
    }
}