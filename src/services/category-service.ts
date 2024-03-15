import { Category } from "@prisma/client";
import prisma from "../repos/db";

export default {
  async findById(id: number) {
    const category = await prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw { msg: "Category not found" };
    }

    return category;
  },

  async create(params: Category) {

    try {
      const newOne = await prisma.category.create({
        data: {
          codigo: params.codigo,
          titulo: params.titulo,
          descricao: params.descricao,
        },
      });

      return newOne;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async findByName(titulo: string) {
    const category = await prisma.category.findFirst({
      where: { titulo },
    });

    if (!category) {
      console.log("Category not found");
    }

    return category;
  },

  async update(params: Category) {

    await prisma.category.update({
      data: params,
      where: { id: params.id },
    });
  },

  async destroy(id: number) {
    await prisma.category.delete({ where: { id } });
  },

  async findAll() {
    const category = await prisma.category.findMany();

    return category;
  },
};
