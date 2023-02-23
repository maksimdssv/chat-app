import { SectionKey } from '../UsersTab';

export interface SectionButtonProps {
  position: 'left' | 'right';
  text: SectionKey;
  action: (section: SectionKey) => void;
  active: SectionKey;
}

const borders = {
  left: 'border-r-2 border-b-2',
  right: 'border-l-2 border-b-2',
};

const SectionButton = ({ position, action, active, text }: SectionButtonProps) => {
  const isActive = active === text;
  return (
    <button
      className={`w-full p-4 ${!isActive ? `${borders[position]} bg-section` : ''}`}
      onClick={() => action(text)}
    >
      {text}
    </button>
  );
};

export default SectionButton;
