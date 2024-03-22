import { ROLE } from "@/constants/constants";

export const dialogToString = (messages) => {
  return messages
    .map(({ role, message }) =>
      role === ROLE.user ? `Human : ${message}` : `AI: ${message}`
    )
    .join("\n");
};
