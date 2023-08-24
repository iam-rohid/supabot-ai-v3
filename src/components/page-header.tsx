export interface PageHeaderProps {
  title?: string;
}
export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="py-4 flex items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}
