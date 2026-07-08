"use client";

import { Button } from "@/components/ui/button";

import ThemeToggle from "./ThemeToggle";

import {
  Pill,
  RefreshCcw,
  Loader2,
} from "lucide-react";

import {
  formatDistanceToNow,
} from "date-fns";

export default function Header({
  refresh,
  lastUpdated,
  loading,
}) {

return(

<header className="mb-10 flex items-center justify-between">

<div className="flex items-center gap-4">

<div className="rounded-2xl bg-primary p-4 text-white">

<Pill className="h-7 w-7"/>

</div>

<div>

<h1 className="text-4xl font-bold tracking-tight">

PharmaVoice AI

</h1>

<p className="text-muted-foreground">

AI-powered Pharmacy Workflow Dashboard

</p>

<div className="mt-2 flex items-center gap-3">

<div className="flex items-center gap-2 text-xs">

<div className="h-2 w-2 rounded-full bg-green-500"/>

Live

</div>

{lastUpdated && (

<p className="text-xs text-muted-foreground">

Updated{" "}

{formatDistanceToNow(lastUpdated,{
addSuffix:true,
})}

</p>

)}

</div>

</div>

</div>

<div className="flex gap-3">

<Button
variant="outline"
onClick={refresh}
disabled={loading}
>

{loading

?

<Loader2 className="mr-2 h-4 w-4 animate-spin"/>

:

<RefreshCcw className="mr-2 h-4 w-4"/>

}

Refresh

</Button>

<ThemeToggle/>

</div>

</header>

)

}