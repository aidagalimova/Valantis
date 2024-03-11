import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "hooks/useOnClickOutside";
import { CleanIcon, DropDown, DropUp } from "shared/assets/icons/icons";
import "./SelectorInput.scss";

interface SelectorInputProps {
  className?: string;
  value: string;
  values: { [key: string]: string } | null;
  placeholder: string;
  onChange: (value: string) => void;
}

const SelectorInput = (props: SelectorInputProps) => {
  const { className, placeholder, values, value, onChange } = props;

  const [isListOpen, setIsListOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<string[] | null>(null);
  const selectorRef = useRef(null);

  useEffect(() => {
    if (values) setFilterValues(Object.values(values));
  }, [values]);

  useEffect(() => {
    if (value) {
      setFilterValues(
        values
          ? Object.values(values).filter((el) =>
              el.toLowerCase().includes(value.toLowerCase())
            )
          : null
      );
    } else if (values) {
      setFilterValues(Object.values(values));
    }
  }, [value]);
  
  const onListClose = () => {
    setIsListOpen(false);
  };
  useOnClickOutside(selectorRef, onListClose);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    onChange?.(searchText);
  };

  const onClean = () => {
    onChange?.("");
  };

  return (
    <div className={`SelectorInput ${className}`} ref={selectorRef}>
      <div className="inputWrapper">
        <input
          className="input"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsListOpen(true)}
        />
        {value ? (
          <div className="rightIcon" onClick={onClean}>
            <CleanIcon />
          </div>
        ) : !isListOpen ? (
          <div className="rightIcon" onClick={() => setIsListOpen(true)}>
            <DropDown />
          </div>
        ) : (
          <div
            className="rightIcon"
            onClick={() => {
              setIsListOpen(false);
            }}
          >
            <DropUp />
          </div>
        )}
      </div>
      {isListOpen && filterValues && (
        <>
          {filterValues.length !== 0 ? (
            <div className="list">
              {filterValues.map((value) => (
                <div
                  className={"listItem"}
                  key={value}
                  onClick={() => {
                    onChange?.(value);

                    setIsListOpen(false);
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          ) : (
            <div className="notFound">Ничего не найдено</div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectorInput;
