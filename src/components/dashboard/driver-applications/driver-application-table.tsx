/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
"use client"
import {
  Check,
  CheckCircle2,
  CircleEllipsis,
  Clock3,
  Eye,
  ExternalLink,
  FileCheck2,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { DriverApplicationSummary } from "./driver-application-summary";
import { DriverApplicationSearch } from "./driver-application-search";
import { useGetDriverApplication } from "@/hooks/driver.hooks";
import { TGetDriverApplication } from "@/types/driver.type";
import AuthLoading from "@/components/auth/authLoading";

const statusStyles = {
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  APPROVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  REJECTED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};








export function DriverApplicationTable() {
  const { data, isPending, isFetching } = useGetDriverApplication()
  const applications = data?.data.length > 0 ? data?.data : []
  const isLoading = isPending || isFetching

  return (
    <>
      <DriverApplicationSummary></DriverApplicationSummary>
      <DriverApplicationSearch></DriverApplicationSearch>
      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <div className="flex flex-col gap-1 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Driver applications
            </h2>
            <p className="text-xs text-muted-foreground">
              Review submitted driver profiles before granting access.
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {applications.length} results
          </span>
        </div>

        {
          isLoading ? <div className="flex min-h-48 items-center justify-center"><AuthLoading label="Retrieving" /></div> :
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted/45 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Applicant</th>
                    <th className="px-4 py-3 font-semibold">License File</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {applications.length ? (
                    applications.map((application: TGetDriverApplication) => (
                      <tr
                        key={application.id}
                        className="transition-colors hover:bg-muted/25"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground">
                                {application.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {application.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={application.licenseFile}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
                          >
                            View license file
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                          </a>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {application.createdAt}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                          >
                            <span className="size-1.5 rounded-full bg-current" />
                            {application.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`View ${application.name}'s application`}
                              title="View application"
                            >
                              <Eye className="size-4" aria-hidden="true" />
                            </Button>
                            {application.status !== "APPROVED" &&
                              application.status !== "REJECTED" ? (
                              <>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-emerald-600 hover:text-emerald-700"
                                  aria-label={`Approve ${application.name}`}
                                  title="Approve application"
                                >
                                  <Check className="size-4" aria-hidden="true" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-rose-600 hover:text-rose-700"
                                  aria-label={`Reject ${application.name}`}
                                  title="Reject application"
                                >
                                  <X className="size-4" aria-hidden="true" />
                                </Button>
                              </>
                            ) : null}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`More options for ${application.name}`}
                              title="More options"
                            >
                              <CircleEllipsis className="size-4" aria-hidden="true" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-sm text-muted-foreground"
                      >
                        No applications match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }


        {/* <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
          <span>Showing static demo data</span>
          <span className="font-medium text-foreground">Page 1 of 1</span>
        </div> */}
      </section>
    </>

  );
}
