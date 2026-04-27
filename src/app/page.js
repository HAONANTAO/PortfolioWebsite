import { getAllWritings } from "@/lib/writings";
import HomeContent from "./components/HomeContent";

export default function Home() {
  const writings = getAllWritings();
  return <HomeContent writings={writings} />;
}
