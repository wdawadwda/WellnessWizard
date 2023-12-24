import { ReactNode } from "react";
import { type Theme } from "../../store/theme/theme.type";

export interface LayoutProps {
  children: ReactNode;
  theme: Theme;
}
