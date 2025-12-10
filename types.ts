export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}
