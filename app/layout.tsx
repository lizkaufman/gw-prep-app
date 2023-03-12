import "./styles/globals.css";
import Header from "./components/Header";

// export const metadata = {
//   title: "Games Workshop",
//   description: "",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Games Workshop</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
