import { DriverApplicationSearch } from "@/components/dashboard/driver-applications/driver-application-search";
import { DriverApplicationSummary } from "@/components/dashboard/driver-applications/driver-application-summary";
import {
  DriverApplicationTable,
} from "@/components/dashboard/driver-applications/driver-application-table";

const ApproveDriverApplication = () => {
  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Admin workspace
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Approve driver applications
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Review and manage new driver applications before they join the
            emergency response network.
          </p>
        </div>
       
      </div>

     
      <DriverApplicationTable />
    </main>
  );
};

export default ApproveDriverApplication;
