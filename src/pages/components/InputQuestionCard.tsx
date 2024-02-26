import { Fragment } from "react";
import TextField from "../../ui/forms/TextField";
import QuestionOptionInput from "../../ui/forms/QuestionOptionInput";
import { RadioGroup, RadioGroupItem } from "../../ui/forms/RadioGroup";
import { Button } from "../../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import Switch from "../../ui/switch";

interface InputQuestionCardProps {
  questionIndex: number;
  question: {
    question: string;
    type: string;
    options: string[];
    required: boolean;
  };
  handleQuestionChange: (
    e: React.FormEvent<HTMLDivElement>,
    index: number
  ) => void;
  handleOptionChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => void;
  handleRemoveOption: (questionIndex: number, optionIndex: number) => void;
  addOption: (questionIndex: number) => void;
  handleRemoveQuestion: (questionIndex: number) => void;
  changeQuestionValidation: (
    questionIndex: number,
    isRequired: boolean
  ) => void;
}
const InputQuestionCard = ({
  question,
  questionIndex,
  handleOptionChange,
  handleQuestionChange,
  addOption,
  handleRemoveOption,
  changeQuestionValidation,
  handleRemoveQuestion,
}: InputQuestionCardProps) => {
  return (
    <div
      key={questionIndex}
      className="bg-white rounded-lg p-4 flex flex-col  "
    >
      <span className=" text-violet-500 font-bold text-lg pb-3 border-b">
        Question {questionIndex + 1}
      </span>
      <article className=" flex flex-col mt-3">
        <section className=" flex flex-row gap-4 border-b py-3 px-2">
          <article className="w-full   flex flex-col gap-4">
            <RadioGroup
              name="type"
              onChange={(e) => {
                // console.log("e", e);
                handleQuestionChange(e, questionIndex);
              }}
              defaultValue={question.type}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm   text-slate-600">
                  Select the Type of Question
                </label>
                <section className="flex-col md:flex-row flex gap-3">
                  {["text", "multipleChoice", "dropdown", "checkbox"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <label htmlFor={type} className="  capitalize text-xs">
                          {type}
                        </label>
                      </div>
                    )
                  )}
                </section>
              </div>
            </RadioGroup>
            <TextField
              variant="filled"
              name="question"
              label="Question Text"
              type="text"
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              value={question.question}
            />

            <section className="flex flex-col mt-2 gap-4">
              {question.options &&
                ["multipleChoice", "dropdown", "checkbox"].includes(
                  question.type
                ) &&
                question.options.map((option, optionIndex) => (
                  <Fragment key={optionIndex}>
                    <QuestionOptionInput
                      position={optionIndex + 1}
                      questionType={question.type}
                      onChange={(e) =>
                        handleOptionChange(e, questionIndex, optionIndex)
                      }
                      onDelete={() => {
                        handleRemoveOption(questionIndex, optionIndex);
                      }}
                      value={option}
                    />
                  </Fragment>
                ))}
              {["dropdown", "multipleChoice", "checkbox"].includes(
                question.type
              ) && (
                <button
                  type="button"
                  className="text-violet-800 font-medium py-1 px-3 rounded-xl self-start text-xs  hover:bg-violet-200 bg-violet-100/100 "
                  onClick={() => addOption(questionIndex)}
                >
                  Add Option
                </button>
              )}
            </section>
          </article>
        </section>
        <section className="mt-3 flex gap-2 items-center justify-end ">
          <Button
            variant="ghost"
            onClick={() => handleRemoveQuestion(questionIndex)}
          >
            <TrashIcon />
          </Button>
          <div className=" flex items-center gap-2">
            <span className=" text-xs text-opacity-70 text-slate-900">
              Required:
            </span>
            <Switch
              value={question.required?.toString()}
              onCheckedChange={(e) => {
                changeQuestionValidation(questionIndex, e);
              }}
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default InputQuestionCard;
