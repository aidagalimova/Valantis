import "./SearchInput.scss";
import { CleanIcon, SearchIcon } from "shared/assets/icons/icons";
interface SearchInputProps {
  className?: string;
  value?: string | number;
  placeholder: string;
  onChange?: (value: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { className, value, placeholder, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onClean = () => {
    onChange?.("");
  };
  return (
    <div className={"InputWrapper"}>
      <div className="searchIcon">
        <SearchIcon />
      </div>
      <input
        value={value}
        onChange={onChangeHandler}
        className={`input ${className}`}
        placeholder={placeholder}
      />
      {value ? (
        <div className="rightIcon" onClick={onClean}>
          <CleanIcon />
        </div>
      ) : null}
    </div>
  );
};
export default SearchInput;
