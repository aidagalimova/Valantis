import "./ThemeSwitcher.scss";

interface ThemeSwitcherProps {
  onClick: () => void;
}
const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { onClick } = props;
  return (
    <label className="switch">
      <input type="checkbox" onClick={onClick} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeSwitcher;
