export default function PageHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
      {action}
    </div>
  );
}