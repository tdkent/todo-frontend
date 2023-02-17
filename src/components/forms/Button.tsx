interface ButtonProps {
  buttonText: string;
  buttonType: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
}

const Button = ({ buttonType, buttonText }: ButtonProps) => {
  return (
    <div>
      <button type={buttonType}>{buttonText}</button>
    </div>
  );
};

export default Button;
