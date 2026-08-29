export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 px-8">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          KUTROL
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-md">
          Gestión Inteligente de Combustible
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-600 text-center">
          Optimiza cada gota. Reduce tu huella.
        </p>
      </main>
    </div>
  );
}
