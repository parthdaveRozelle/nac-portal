import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionIcon from "@mui/icons-material/Description";
import SyncIcon from "@mui/icons-material/Sync";
import HistoryIcon from "@mui/icons-material/History";

export const SIDEBAR_ITEMS = [
  {
    text: "Dashboard",
    icon: DashboardIcon,
    route: "/",
  },
  {
    text: "Medications",
    icon: MedicationIcon,
    route: "/medications",
  },
  {
    text: "Guidelines",
    icon: DescriptionIcon,
    route: "/guidelines",
  },
  {
    text: "Sync",
    icon: SyncIcon,
    route: "/sync",
  },
  {
    text: "Audit",
    icon: HistoryIcon,
    route: "/audit",
  },
];
