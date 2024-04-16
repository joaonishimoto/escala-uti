-- CreateEnum
CREATE TYPE "Status" AS ENUM ('estavel', 'urgente');

-- CreateTable
CREATE TABLE "escalas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "escala" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "description" TEXT[],
    "pendencias" TEXT[],

    CONSTRAINT "escalas_pkey" PRIMARY KEY ("id")
);
