interface Props {
  text: string;
  buttonType: 'normal' | 'success';
}

export const Button = ({ text, buttonType }: Props) => {
  const colorCode = {
    success: 'bg-green-600',
    normal: 'bg-zinc-800',
  };
  return (
    <button
      className={`${colorCode[buttonType]} inline-block m-2 py-2 px-4 rounded-md text-small`}
    >
      {text}
    </button>
  );
};
