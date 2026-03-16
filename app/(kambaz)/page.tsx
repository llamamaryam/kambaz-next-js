import { redirect } from "next/navigation";

export default function KambazIndexPage() {
  redirect("/account/signin");
}