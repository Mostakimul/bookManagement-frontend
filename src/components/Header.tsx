import HeroBook from '../assets/hero.png';

const Header = () => {
  return (
    <div className="flex justify-between align-middle items-center min-h-screen">
      {/* left section */}
      <div className="grid gap-3">
        <h3 className="text-yellow-100 text-xl">
          LET'S MAKE THE BEST INVESTMENT
        </h3>
        <h1 className="text-gray-200 text-5xl">
          There Is No Friend As Loyal As A Book
        </h1>
        <p className="text-lg text-orange-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad harum
          quibusdam, assumenda quia explicabo.
        </p>
      </div>

      {/* right section */}
      <div>
        <img src={HeroBook} alt="book" />
      </div>
    </div>
  );
};

export default Header;
