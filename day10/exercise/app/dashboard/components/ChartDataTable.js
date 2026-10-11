export default function ChartDataTable({ data }) {
  return (
    <table>
      <caption>Daily revenue and order counts</caption>

      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Revenue (ETB)</th>
          <th scope="col">Orders</th>
        </tr>
      </thead>

      <tbody>
        {data.map((day) => (
          <tr key={day.date}>
            <td>{day.date}</td>
            <td className="number">
              {day.revenue.toLocaleString("en-US")}
            </td>
            <td className="number">{day.orders}</td>
          </tr>
        ))}

        {data.length === 0 && (
          <tr>
            <td colSpan={3}>No chart data available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}