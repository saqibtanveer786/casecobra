"use server";
import { db } from "@/db";
import { TextElement } from "@prisma/client";

type Design = {
  mainImg: string;
  textElements: TextElement[];
};
export const saveCustomization = async (design: Design) => {
  const { mainImg, textElements } = design;
  try {
    const { id } = await db.customizedDesign.create({
      data: {
        image: mainImg,
        customizedTextElements: {
          createMany: {
            data: [...textElements],
          },
        },
      },
    });
    return id;
  } catch (e) {
    console.log("what went wrong is", e);
    throw new Error("Something went wrong!");
  }
};
