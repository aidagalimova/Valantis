import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children } = props;

  return (
    <button type="button" className={"Button"} {...props}>
      <div>{children}</div>
    </button>
  );
};

export default Button;
