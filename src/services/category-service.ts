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

  async create(params: any) {
      console.log('aaaaaaaa')
      console.log(params)
      console.log('bbbbbbbb')

    try {
      const newOne = await prisma.category.create({
        data: {
          code: params.code,
          title: params.title,
          description: params.description,
        },
      });

      return newOne;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async findByName(title: string) {
    const category = await prisma.category.findFirst({
      where: { title },
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
