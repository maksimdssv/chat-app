import SectionButton, { SectionButtonProps } from './SectionButton';
import { SectionKey } from '../UsersTab';

interface SectionButtonsContainerProps {
  onClick: (section: SectionKey) => void;
  active: SectionKey;
  buttons: ButtonProps[];
}

export type ButtonProps = Pick<SectionButtonProps, 'text' | 'position'>;
const SectionButtonsContainer = ({
  onClick,
  active,
  buttons,
}: SectionButtonsContainerProps) => {
  return (
    <div className={'flex'}>
      {buttons.map((button, index) => (
        <SectionButton
          key={index}
          position={button.position}
          text={button.text}
          action={onClick}
          active={active}
        />
      ))}
    </div>
  );
};

export default SectionButtonsContainer;
