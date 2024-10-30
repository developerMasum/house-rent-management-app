export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 mt-16 overflow-y-auto">{children}</div>
    </main>
  );
}
