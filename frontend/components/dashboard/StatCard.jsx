import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-primary",
}) {
  return (
    <Card className="rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6">

        <div className="flex items-center justify-between">

          <div className={`rounded-xl bg-primary/10 p-3 ${color}`}>
            <Icon className="h-6 w-6"/>
          </div>

          <h2 className="text-4xl font-bold tracking-tight">
            {value}
          </h2>

        </div>

        <div className="mt-5">

          <p className="font-medium">
            {title}
          </p>

          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}

        </div>

      </CardContent>
    </Card>
  );
}