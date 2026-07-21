export function DashboardFooter() {
  return (
    <footer className="mt-12 mb-8 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
      <p>© {new Date().getFullYear()} FEAG Future Service Pricing Algorithm</p>
      <p className="mt-2 text-slate-400 max-w-lg mx-auto">
        This executive dashboard provides real-time visibility into the FSPA model outputs. 
        Calculations are strictly for demonstration purposes.
      </p>
    </footer>
  );
}
