import { ReactNode } from "react";
import { Theme } from "../../../store/theme/theme.type";

export interface LayoutProps {
  children: ReactNode;
  theme: Theme;
}
