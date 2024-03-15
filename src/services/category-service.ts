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

  async update(params: any) {

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
