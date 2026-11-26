import { Home, ShieldX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NoAccess = () => {
  return (
    <main
      aria-labelledby="no-access-title"
      className="flex min-h-[70vh] items-center justify-center bg-muted/30 px-4 py-12"
    >
      <Card className="w-full max-w-lg text-center shadow-sm">
        <CardHeader className="items-center gap-4 pb-2">
          <div
            aria-hidden="true"
            className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          >
            <ShieldX className="size-8" />
          </div>
          <div className="space-y-2">
            <CardTitle id="no-access-title" className="text-2xl">
              Access denied
            </CardTitle>
            <CardDescription className="text-base">
              You don&apos;t have permission to view this page. Please return
              home and continue from there.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Button nativeButton={false} render={<Link href="/" />} size="lg">
            <Home />
            Return home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default NoAccess;
