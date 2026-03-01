interface PricingRow {
  noOfPax: string | number;
  cab: string;
  costPerPax: string | number;
}

interface PricingTableProps {
  pricing?: PricingRow[];
}

export default function PricingTable({ pricing }: PricingTableProps) {
  if (!pricing?.length) return null;

  return (
    <table className="w-full border mt-4 text-center">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Pax</th>
          <th className="border p-2">Cab</th>
          <th className="border p-2">Cost</th>
        </tr>
      </thead>
      <tbody>
        {pricing.map((row, i) => (
          <tr key={i}>
            <td className="border p-2">{row.noOfPax}</td>
            <td className="border p-2">{row.cab}</td>
            <td className="border p-2">{row.costPerPax}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
