import z from 'zod';

export const InvoiceDataSchema  = z.object({
    invoiceNumber: z.string().min(1, 'Invoice Number is required'),
     invoiceDate: z.string().min(1, 'Invoice date is required'),
  totalAmount: z.number().min(1, 'Total amount is required'),
})

export type InvoiceData = z.infer<typeof InvoiceDataSchema >;
