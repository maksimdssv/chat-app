import { getImageUrl } from '../../../utils';

interface HeaderProps {
  name: string;
  avatar: string;
}

const Header = ({ name, avatar }: HeaderProps) => {
  return (
    <header className={'flex flex-row gap-x-4 bg-chat-header md:gap-x-8'}>
      <div className={'flex items-center'}>
        <img
          src={getImageUrl(avatar)}
          alt={''}
          className={
            'ml-4 h-32 w-24 rounded-xl bg-blue-50 object-cover md:ml-0 md:h-52 md:w-52 md:rounded-none'
          }
        />
      </div>
      <div className={'flex-1 py-2 pr-4 md:p-4 md:pl-0'}>
        <h1 className={'font-semibold'}>{name}</h1>
        <p className={'text-xl tracking-tighter'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur
          assumenda consequatur dicta eius, eligendi eveniet fugiat iusto magni non odio
          officia optio quibusdam ratione reiciendis totam unde? Eveniet excepturi non
          quas repudiandae temporibus voluptates.
        </p>
      </div>
    </header>
  );
};

export default Header;
