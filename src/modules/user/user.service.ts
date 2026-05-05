import prisma from "../../config/prisma";
import fs from "fs";
import path from "path";
import { UserUpdateInput } from "../../generated/prisma/models";

export const getProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      isVerified: true,
      createdAt: true,
      addresses: {
        include: {
          province: true,
          city: true,
          district: true,
        },
      },
    },
  });
  if (!user) {
    throw new Error("User tidak ditemukan");
  }
  return user;
};

export const updateUserService = async (
  userId: number,
  updateData: UserUpdateInput,
) => {
  const oldUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatar: true },
  });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      name: true,
      phone: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });

  if (
    oldUser?.avatar &&
    updateData.avatar &&
    oldUser.avatar !== updateData.avatar
  ) {
    const oldFilePath = path.join(
      process.cwd(),
      "uploads/photos",
      oldUser.avatar as string,
    );

    if (fs.existsSync(oldFilePath)) {
      try {
        fs.unlinkSync(oldFilePath);
      } catch (err) {
        console.warn(
          `[Cleanup Warning]: Gagal menghapus file ${oldUser.avatar}`,
        );
      }
    }
  }

  return updatedUser;
};
