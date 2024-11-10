/*
  Warnings:

  - You are about to drop the column `configurationId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customizedDesignId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontColor` to the `TextElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontFamily` to the `TextElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontSize` to the `TextElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `left` to the `TextElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TextElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top` to the `TextElement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_configurationId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "configurationId",
DROP COLUMN "shippingAddressId",
ADD COLUMN     "customizedDesignId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TextElement" ADD COLUMN     "fontColor" TEXT NOT NULL,
ADD COLUMN     "fontFamily" TEXT NOT NULL,
ADD COLUMN     "fontSize" INTEGER NOT NULL,
ADD COLUMN     "left" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "top" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Configuration";

-- DropTable
DROP TABLE "ShippingAddress";

-- DropEnum
DROP TYPE "CaseColor";

-- DropEnum
DROP TYPE "CaseFinish";

-- DropEnum
DROP TYPE "CaseMaterial";

-- DropEnum
DROP TYPE "PhoneModel";

-- CreateTable
CREATE TABLE "CustomizedDesign" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomizedDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomizedTextElement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "fontSize" INTEGER NOT NULL,
    "customizedDesignId" TEXT NOT NULL,

    CONSTRAINT "CustomizedTextElement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customizedDesignId_fkey" FOREIGN KEY ("customizedDesignId") REFERENCES "CustomizedDesign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomizedTextElement" ADD CONSTRAINT "CustomizedTextElement_customizedDesignId_fkey" FOREIGN KEY ("customizedDesignId") REFERENCES "CustomizedDesign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
