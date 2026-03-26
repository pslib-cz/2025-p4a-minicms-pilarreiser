type SessionUserLike = {
  id?: string | null;
  role?: string | null;
};

export function isAdmin(user: SessionUserLike | null | undefined) {
  return user?.role === "ADMIN";
}

export function canManageWeedLog(
  user: SessionUserLike | null | undefined,
  authorId: string,
) {
  return Boolean(user?.id) && (user?.id === authorId || isAdmin(user));
}
