import InvoiceNavbar from "./_components/invoiceNavbar";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Full-width responsive navbar */}
   
      {/* Main content area with adjusted margin and padding */}
      <main className="flex-grow w-full max-w-5xl mx-auto p-4 lg:p-8 bg-white shadow-lg rounded-md mt-6">
        {children}
      </main>
    </div>
  );
}
