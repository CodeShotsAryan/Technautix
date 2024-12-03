"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const invoiceFeatures = [
  {
    title: "Upload Invoice",
    href: "/invoice-processing/upload",
    description: "Upload new invoices for processing and approval.",
  },
  {
    title: "View Invoices",
    href: "/invoice-processing/view",
    description: "View all processed invoices with details and statuses.",
  },
  {
    title: "Pending Approvals",
    href: "/invoice-processing/pending",
    description: "Review invoices that are awaiting approval.",
  },
  {
    title: "Rejected Invoices",
    href: "/invoice-processing/rejected",
    description: "View and manage invoices that have been rejected.",
  },
  {
    title: "Invoice Reports",
    href: "/invoice-processing/reports",
    description: "Generate reports on processed invoices.",
  },
];

export default function InvoiceNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white p-4 shadow-md rounded-lg lg:flex lg:justify-center lg:max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center lg:hidden">
        <h1 className="text-lg font-semibold">Invoices</h1>
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <NavigationMenu className={cn("hidden lg:flex justify-center space-x-4")}>
        <NavigationMenuList className="flex flex-wrap justify-center space-x-2">
          {invoiceFeatures.map((feature) => (
            <NavigationMenuItem key={feature.title} className="relative group">
              <NavigationMenuTrigger className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                {feature.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <NavigationMenuLink
                  href={feature.href}
                  className="block p-4 hover:bg-gray-50 rounded-md"
                >
                  <div className="text-base font-semibold text-gray-800">
                    {feature.title}
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-gray-50 rounded-lg p-4 space-y-2 shadow-md">
          {invoiceFeatures.map((feature) => (
            <a
              key={feature.title}
              href={feature.href}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <div className="font-medium">{feature.title}</div>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
