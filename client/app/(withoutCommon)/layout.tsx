import { DashboardLayout } from "@/components/Dashboard/Sidebar/DashboardLayout";

const DashboardLayoutNew = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default DashboardLayoutNew;
