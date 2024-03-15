-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
