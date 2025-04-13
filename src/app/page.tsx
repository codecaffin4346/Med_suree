"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex antialiased">
        <Sidebar>
          <SidebarContent>
            {/* Sidebar content can be added here if needed */}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Dashboard results={results} setResults={setResults} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
