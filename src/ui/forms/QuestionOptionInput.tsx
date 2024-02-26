import { BoxIcon, CircleIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../button";

interface QuestionOptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  questionType: string;
  position: number;
}
const QuestionOptionInput = ({
  value,
  onChange,
  onDelete,
  questionType,
  position,
}: QuestionOptionInputProps) => {
  return (
    <div className="flex items-center gap-2 ">
      {(questionType === "multipleChoice" && (
        <CircleIcon className=" text-slate-400 h-6  w-6" />
      )) ||
        (questionType === "checkbox" && (
          <BoxIcon className=" text-slate-400  h-6  w-6" />
        )) || <span className=" text-slate-400 text-xl">{position}.</span>}
      <input
        type="text"
        placeholder="Option"
        className=" w-full border-b-2 focus:border-violet-600 focus:outline-none px-2 py-1"
        value={value}
        onChange={onChange}
      />
      <Button variant="ghost" size="icon" type="button" onClick={onDelete}>
        <Cross2Icon className="h-4  w-4" />
      </Button>
    </div>
  );
};

export default QuestionOptionInput;
