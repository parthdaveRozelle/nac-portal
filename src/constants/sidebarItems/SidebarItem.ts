import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionIcon from "@mui/icons-material/Description";
import SyncIcon from "@mui/icons-material/Sync";
import HistoryIcon from "@mui/icons-material/History";
import { ROUTES } from "../routes";

export const SIDEBAR_ITEMS = [
  {
    text: "Dashboard",
    icon: DashboardIcon,
    route: ROUTES.DASHBOARD,
  },
  {
    text: "Medications",
    icon: MedicationIcon,
    route: ROUTES.MEDICATIONS,
  },
  {
    text: "Guidelines",
    icon: DescriptionIcon,
    route: ROUTES.GUIDELINES,
  },
  {
    text: "Sync",
    icon: SyncIcon,
    route: ROUTES.SYNC,
  },
  {
    text: "Audit",
    icon: HistoryIcon,
    route: ROUTES.AUDIT,
  },
];
