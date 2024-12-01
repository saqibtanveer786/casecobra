import { db } from "@/db";
import { notFound } from "next/navigation";
import CustomizedDesignPreview from "./CustomizedDesignPreview";
import * as fabric from "fabric";
import { textElements } from "../customize/dummyTextElements";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // const { id } = await searchParams;
  // if (!id || typeof id !== "string") {
  //   console.log("not found");
  //   return notFound();
  // }

  // const customizedDesign = await db.customizedDesign.findUnique({
  //   where: { id },
  //   select: {
  //     image: true,
  //     customizedTextElements: true,
  //   },
  // });

  // if (!customizedDesign) return notFound();
  const customizedDesign = {
    image: "/desdes.png",
    customizedTextElements: textElements,
  };
  console.log(customizedDesign);

  return <CustomizedDesignPreview customizedDesign={customizedDesign} />;
};

export default Page;
