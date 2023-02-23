interface HeaderProps {
  name: string;
  avatar: string;
}

const Header = ({ name, avatar }: HeaderProps) => {
  return (
    <header className={'flex flex-row gap-x-8 bg-chat-header'}>
      <div className={''}>
        <img
          src={`src/public/${avatar}.jpg`}
          alt={''}
          className={'h-36 w-36 bg-blue-50 object-fill lg:h-52 lg:w-52'}
        />
      </div>
      <div className={'flex-1 p-4 md:pl-0'}>
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
