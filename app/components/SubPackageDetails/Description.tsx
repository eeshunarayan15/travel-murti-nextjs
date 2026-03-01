interface DescriptionProps {
  subPackage: {
    description?: string;
  };
}

export default function Description({ subPackage }: DescriptionProps) {
  if (!subPackage.description) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
      </div>

      <p className="text-slate-600 text-base md:text-lg leading-relaxed">
        {subPackage.description}
      </p>

      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-12 h-[2px] bg-blue-200 rounded" />
      </div>
    </div>
  );
}
