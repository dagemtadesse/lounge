"use client";

import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const AuthGuard = ({
  children,
  require,
}: {
  children: ReactNode;
  require: "loggedIn" | "loggedOut" | undefined;
}) => {
  const { status } = useSession();

  if (require == "loggedIn" && status == "unauthenticated")
    redirect(ROUTES.SIGN_IN);
  if (require == "loggedOut" && status == "authenticated")
    redirect(ROUTES.HOME);

  return <>{children}</>;
};
