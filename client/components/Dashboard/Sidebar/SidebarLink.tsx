import { ISidebarItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type IProps = {
  item: ISidebarItem;
};

const SidebarLink = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  // console.log("linkPath", linkPath);
  const pathName = usePathname();
  const isActive = pathName === linkPath;

  return (
    <Link
      key={item.title}
      href={linkPath}
      className={cn(
        "flex items-center gap-3 rounded-lg px-1 py-2 transition-all",
        isActive
          ? "bg-gradient-to-r from-red-500 to-amber-500 text-gray-100"
          : "text-muted-foreground hover:text-red-500 hover:bg-gradient-to-r "
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  );
};

export default SidebarLink;
