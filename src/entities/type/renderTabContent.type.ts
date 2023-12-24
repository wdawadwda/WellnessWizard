import { Theme } from "../../store/theme/theme.type";

export type RenderTabContentProps = {
  activeTab: string | null;
  t: (key: string) => string;
  theme: Theme;
};
