import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceList } from "@/app/component/InvoiceList";

export default function InvoicesRoute() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
