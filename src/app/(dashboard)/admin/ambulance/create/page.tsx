import AmbulanceForm from "@/components/form/ambulance_form";

const CreateAmbulancePage = () => {
  return (
    <main className="mx-auto w-full max-w-[1100px] space-y-6 pb-8">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Admin workspace</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Create ambulance</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Register an ambulance provider and add a response vehicle to the emergency dispatch network.</p>
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6 border-b border-border/70 pb-5">
          <h2 className="text-base font-semibold text-foreground">Ambulance provider details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Enter the provider contact information and vehicle details.</p>
        </div>
        <AmbulanceForm />
      </section>
    </main>
  );
};

export default CreateAmbulancePage;
