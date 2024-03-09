import { CleanIcon } from "shared/assets/icons/icons";
import "./RangeInput.scss";

interface RangeInputProps {
  values: number[];
  max: number | null;
  min: number | null;
  selectedItem: {
    index: number;
    value: number;
  } | null;
  onChange: (value: { index: number; value: number } | null) => void;
  placeholder?: string;
}

const RangeInput = (props: RangeInputProps) => {
  const { values, selectedItem, min, max, placeholder, onChange } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    onChange({
      index,
      value: values[index],
    });
  };

  const onClean = () => {
    onChange(null);
  };

  return (
    <div className="RangeInput">
      <div className="inputWrapper">
        <input
          className="input"
          value={selectedItem?.value || ""}
          maxLength={values[values.length - 1]?.toString().length}
          onChange={(e) =>
            onChange({
              index: 0,
              value: parseFloat(e.target.value),
            })
          }
          placeholder={placeholder}
        />
        {selectedItem?.value ? (
          <div className="rightIcon" onClick={onClean}>
            <CleanIcon />
          </div>
        ) : null}
      </div>
      <div className="range">
        <div className="label">{values[0]}</div>
        <input
          type="range"
          className="max-price"
          value={selectedItem?.index || 0}
          min={min || 0}
          max={max || 0}
          step={1}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        <div className="label">{values[values.length - 1]}</div>
      </div>
    </div>
  );
};

export default RangeInput;
