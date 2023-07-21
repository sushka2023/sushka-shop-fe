import { ReactComponent as IconSearch } from '../../../../icons/search.svg';
import { ReactComponent as IconAccount } from '../../../../icons/account.svg';
import { ReactComponent as IconFavorite } from '../../../../icons/favorite.svg';
import { ReactComponent as IconCart } from '../../../../icons/cart.svg';

const HeaderListIcons = () => {
  return (
    <ul className="list-icons">
      <li className="list-icons__line">
        <IconSearch className="icons-nav__search" />
      </li>
      <li className="list-icons__line">
        <IconAccount className="icons-nav" />
      </li>
      <li className="list-icons__line">
        <IconFavorite className="icons-nav" />
      </li>
      <li className="list-icons__line">
        <IconCart className="icons-nav" />
      </li>
    </ul>
  );
};

export default HeaderListIcons;
