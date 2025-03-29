import devvo from '../../assets/devvo.png';
import './styles.css';

export default function Header() {
  return (
    <header className="header">
      <img src={devvo} alt="logo" />
      <strong>Os Anéis do Poder</strong>
      <span>Cleyton</span>
    </header>
  );
}
