export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="w-full max-w-5xl p-4 lg:p-8 bg-white shadow-lg rounded-md">
        {children}
      </main>
    </div>
  );
}
