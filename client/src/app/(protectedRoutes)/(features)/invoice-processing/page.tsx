import InvoiceNavbar from "./_components/invoiceNavbar";

export default function invoicePage() {
  return (
    <div className="invoice">
      <header className="w-full">
        <InvoiceNavbar />
      </header>

      <h2>Invoice</h2>
    </div>
  );
}
