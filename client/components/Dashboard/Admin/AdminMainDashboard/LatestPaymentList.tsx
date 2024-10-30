import Loading from "@/components/Common/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOfflinePaymentsQuery } from "@/redux/api/paymentApi";

const LatestPaymentList = () => {
  const { data: paymentData, isLoading } = useGetOfflinePaymentsQuery({});
  console.log(paymentData);
  if (isLoading) {
    return <Loading />;
  }

  // Function to format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // hour12: true,
    });
  };

  return (
    <div className="container mx-auto p-4 shadow-2xl px-3 py-2">
      <h1 className="text-xl font-bold mb-4 text-slate-200">Latest Payments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentData.map((payment: any) => (
            <TableRow key={payment.id}>
              {/* Format the createdAt field */}
              <TableCell>{formatDateTime(payment.createdAt)}</TableCell>
              <TableCell>{payment.user.name}</TableCell>
              <TableCell>{payment.user.phone}</TableCell>
              <TableCell>{payment.plan}</TableCell>
              <TableCell>{payment.schedule}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestPaymentList;
