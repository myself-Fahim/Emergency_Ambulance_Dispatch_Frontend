import { ArrowLeft, Siren } from "lucide-react";
import Link from "next/link";
import Driver_Application_Form from "@/components/form/driver_application_form";

const Driver_Application = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to home
      </Link>

      <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Siren className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-card-foreground md:text-3xl">
            Driver application
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Apply to join our ambulance response team. Enter your details and we
            will contact you after reviewing your application.
          </p>
        </div>

        <Driver_Application_Form />
      </div>
    </div>
  );
};

export default Driver_Application;
