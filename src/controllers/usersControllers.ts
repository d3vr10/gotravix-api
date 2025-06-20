import { Request, Response } from "express";
import {  getUserById } from '@/repositories/db/userRepository';
import { buildUserDataFull } from "@/utils/buildUserData";
import logger from "@/utils/logger";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      logger.warn("User not found", { id });
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const userData = await buildUserDataFull(user);
    logger.info("User retrieved", { id });
    return res.status(200).json({
      ok: true,
      message: "✅ User retrieved successfully",
      user: userData
    });
  } catch (error) {
    logger.error("Error retrieving user", { error });
    res.status(500).json({
      ok: false,
      message: '💥 Internal server error',
    });
  }
};


// export const createUsers = async (req: Request, res: Response) => {
//   try {
//     const userData = req.body;
//     const newUser = await createUser(userData);
//     // Exclude password from response if present
//     const { password, ...userWithoutPassword } = newUser;
//     res.status(201).json({
//       ok: true,
//       message: "✅ User created successfully",
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       ok: false,
//       message: "💥 Internal server error",
//     });
//   }
// };

// export const updateUsers = async (req: Request, res: Response) => {
//   try {
//     const userId = z
//       .number()
//       .parse(req.params.id);
//     const updateData = req.body;
//     const updatedUser = await updateUser(userId, updateData);
//     if (!updatedUser) {
//       return res.status(404).json({
//         ok: false,
//         message: "User not found",
//       });
//     }
//     const { password, ...userWithoutPassword } = updatedUser;
//     res.status(200).json({
//       ok: true,
//       message: "✅ User updated successfully",
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       ok: false,
//       message: "💥 Internal server error",
//     });
//   }
// };

export const createUsers = (req: Request, res: Response) => {
  logger.info("Create user request", {
    query: req.query,
    body: req.body,
    params: req.params
  });
}

export const updateUsers = (req: Request, res: Response) => {
  logger.info("Update user request", {
    query: req.query,
    body: req.body,
    params: req.params
  });
}