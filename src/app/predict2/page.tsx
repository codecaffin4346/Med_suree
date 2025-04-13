"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <SidebarProvider>
      <div className="medsure-container min-h-screen flex antialiased">
        {/* <Sidebar>
          <SidebarContent>
          </SidebarContent>
        </Sidebar> */}
        <SidebarInset>
          <Dashboard results={results} setResults={setResults} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
