import { redirect } from "next/navigation";

export default function RedirectLogin() {
  redirect("/admin-login");
}
