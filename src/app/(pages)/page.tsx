import { AuthGuard } from "@/app/_components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <></>
    </AuthGuard>
  );
}
