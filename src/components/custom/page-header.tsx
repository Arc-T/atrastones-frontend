export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center mb-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h1>
    </div>
  );
}
