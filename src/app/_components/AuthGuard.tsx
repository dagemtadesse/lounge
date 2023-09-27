"use client";

import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const AuthGuard = ({
  children,
  require,
}: {
  children: ReactNode;
  require: "loggedIn" | "loggedOut" | undefined;
}) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (require == "loggedIn" && status == "unauthenticated")
      router.push(ROUTES.SIGN_IN);
    if (require == "loggedOut" && status == "authenticated")
      router.push(ROUTES.HOME);
  }, [router, require, status]);

  return <>{children}</>;
};
