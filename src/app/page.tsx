import { redirect } from "next/navigation";

// Simply redirecting to en
const RootPage = () => {
  return redirect("/en");
};

export default RootPage;
