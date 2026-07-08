import {
  Phone,
  CheckCircle2,
  CircleCheckBig,
  AlertTriangle,
  Percent,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardStats({ calls }) {

  const total = calls.length;

  const verified =
    calls.filter(c => c.verificationPassed).length;

  const completed =
    calls.filter(
      c => c.conversationState==="COMPLETED"
    ).length;

  const followup =
    calls.filter(c => c.needsFollowUp).length;

  const verificationRate =
    total===0
      ? 0
      : Math.round((verified/total)*100);

  return (

<div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

<StatCard
title="Total Calls"
value={total}
subtitle="Patients contacted"
icon={Phone}
/>

<StatCard
title="Verified"
value={verified}
subtitle="Identity confirmed"
icon={CheckCircle2}
color="text-green-600"
/>

<StatCard
title="Completed"
value={completed}
subtitle="Workflow finished"
icon={CircleCheckBig}
color="text-blue-600"
/>

<StatCard
title="Follow-up"
value={followup}
subtitle="Requires staff"
icon={AlertTriangle}
color="text-orange-500"
/>

<StatCard
title="Verification Rate"
value={`${verificationRate}%`}
subtitle="Overall success"
icon={Percent}
color="text-purple-500"
/>

</div>

  );

}