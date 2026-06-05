"use client";

import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { FileText, Ruler, Hammer, Leaf } from "lucide-react";

import { Product } from "@/types";

interface ProductInfoTabsProps {
  product: Product;
}

const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({ product }) => {
  return (
    <div className="w-full mt-10">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-none border-b border-gray-200 dark:border-gray-700 p-1 overflow-x-auto">
          <InfoTab
            label="Description"
            icon={<FileText className="w-4 h-4 mr-2" />}
          />
          <InfoTab
            label="Measurements"
            icon={<Ruler className="w-4 h-4 mr-2" />}
          />
          <InfoTab
            label="Materials & Care"
            icon={<Leaf className="w-4 h-4 mr-2" />}
          />
          <InfoTab
            label="Assembly"
            icon={<Hammer className="w-4 h-4 mr-2" />}
          />
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">
            {product.description || "No description available."}
          </Tab.Panel>

          <Tab.Panel className="text-sm text-gray-600 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">
            {product.measurements || "No measurements available."}
          </Tab.Panel>

          <Tab.Panel className="text-sm text-gray-600 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">
            {product.materialsAndCare || "No materials and care information available."}
          </Tab.Panel>

          <Tab.Panel className="text-sm text-gray-600 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">
            {product.assembly || "No assembly instructions available."}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const InfoTab = ({ label, icon }: { label: string; icon: React.ReactNode }) => {
  return (
    <Tab
      className={({ selected }) =>
        cn(
          "w-full rounded-t-lg py-2.5 text-sm font-medium leading-5",
          "focus:outline-none ring-offset-0 focus:ring-0",
          selected
            ? "bg-white dark:bg-black text-black dark:text-white shadow-sm border-b-2 border-black dark:border-white"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900",
        )
      }
    >
      <div className="flex items-center justify-center">
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </div>
    </Tab>
  );
};

export default ProductInfoTabs;
