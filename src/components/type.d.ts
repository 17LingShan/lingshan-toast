export interface ToastManagerHandle {
  info: (content: ReactNode) => number;
  remove: (id: number) => void;
}
