import { AuthGuard } from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <></>
    </AuthGuard>
  );
}
