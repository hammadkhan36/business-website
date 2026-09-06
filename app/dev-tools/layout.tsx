import { notFound } from "next/navigation";

export default function DevToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return children;
}



// Iska faida:

// local development mein test pages open honge
// production build/live website mein 404 honge