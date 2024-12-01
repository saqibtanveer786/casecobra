import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignCustomizer from "./DesignCustomizer";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // get the id
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  // get the design form db
  let design;
  try {
    design = await db.design.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        mainImg: true,
        textElements: true,
      },
    });
  } catch (e) {
    return notFound();
  }
  if (!design) return notFound();

  return <DesignCustomizer design={design} />;
};

export default Page;
