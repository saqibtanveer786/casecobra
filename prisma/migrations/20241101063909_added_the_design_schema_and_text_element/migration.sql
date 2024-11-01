-- CreateTable
CREATE TABLE "Design" (
    "id" TEXT NOT NULL,
    "previewImg" TEXT NOT NULL,
    "mainImg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextElement" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "designId" TEXT NOT NULL,

    CONSTRAINT "TextElement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextElement" ADD CONSTRAINT "TextElement_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
