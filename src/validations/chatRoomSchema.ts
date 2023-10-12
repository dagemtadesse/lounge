import { string, z } from "zod";

export const ChatRoomSchema = z.object({
  isPublic: z.boolean(),
  name: z.string().min(1).max(25),
  emojiIcon: z.string().optional(),
  handle: z.string().max(20).optional(),
});

export const UpdateChatRoomSchema = z.object({
  id: string(),
  isPublic: z.boolean(),
  name: z.string().min(1).max(25),
  emojiIcon: z.string().optional(),
  handle: z.string().max(20).optional(),
});
