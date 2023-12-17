export interface TabsProperties {
  activeTab: FormState | null;
  tabs: FormState[];
  handleTabClick: (tab: string | null) => void;
  center?: boolean;
}

export type FormState = string[number];

export type UseRedirectLogicProps = {
  content: Content;
  redirectedRef: RedirectedRef;
  onUnmountValue: string | null;
  handleTabClick: (tab: string | null) => void;
};

export type Content = {
  type: "redirect" | "content";
  screen?: string;
  component?: React.ReactElement | null;
} | null;

type RedirectedRef = {
  current: boolean;
};
