import { useCallback, useEffect, useMemo } from "react";
import TextField from "../../ui/forms/TextField";
import SelectField from "../../ui/forms/Select";
import { RadioGroup, RadioGroupItem } from "../../ui/forms/RadioGroup";
import { useFormik } from "formik";
import Checkbox from "../../ui/forms/Checkbox";

interface QuestionCardProps {
  questionIndex: number;
  question: string;
  type: string;
  options: string[];
  required: boolean;
  formik: ReturnType<typeof useFormik>;
}
const QuestionCard = (props: QuestionCardProps) => {
  const { questionIndex, question, type, options, required, formik } = props;

  const { handleBlur, handleChange, values, errors, touched, setFieldValue } =
    formik;

  useEffect(() => {}, [errors]);
  const fieldErrorMessage = useMemo(
    () =>
      touched.questions &&
      touched.questions?.[questionIndex]?.answer &&
      errors?.[`questions[${questionIndex}].answer`]?.toString(),
    [errors, questionIndex, touched]
  );

  const handleCheckboxAnswers = useCallback(
    (checked: boolean | string, option: string) => {
      const newOptions = new Set(
        values?.questions?.[questionIndex]?.answer || []
      );
      if (checked) {
        newOptions.add(option);
      } else {
        newOptions.delete(option);
      }
      setFieldValue(
        `questions[${questionIndex}].answer`,
        Array.from(newOptions)
      );
    },
    [questionIndex, setFieldValue, values]
  );
  const renderQuestionType = useMemo(() => {
    const componentMapping = {
      text: (
        <TextField
          name={`questions[${questionIndex}].answer`}
          onChange={handleChange}
          onBlur={handleBlur}
          error={fieldErrorMessage || undefined}
          value={values?.questions?.[questionIndex]?.answer || ""}
          label="Your answer"
          required={required}
        />
      ),
      dropdown: (
        <>
          <SelectField
            options={options}
            label="Select your answer"
            error={fieldErrorMessage || undefined}
          />
        </>
      ),
      checkbox: (
        <section className="flex md:flex-row flex-col gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Checkbox
                checked={values?.questions?.[questionIndex]?.answer?.includes(
                  option
                )}
                name={`questions[${questionIndex}].answer`}
                onChange={handleChange}
                onBlur={handleBlur}
                onCheckedChange={(checked) => {
                  handleCheckboxAnswers(checked, option);
                }}
                id={option}
              />
              <label
                htmlFor={option}
                className=" cursor-pointer first-letter:capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </section>
      ),

      multipleChoice: (
        <section>
          <RadioGroup
            name="type"
            onChange={(e) => {
              // console.log("e", e);
            }}
            error={fieldErrorMessage}
          >
            <div className="flex flex-col gap-2">
              <section className="flex-col md:flex-row flex gap-3">
                {options.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <label htmlFor={type} className="  capitalize text-xs">
                      {type}
                    </label>
                  </div>
                ))}
              </section>
            </div>
          </RadioGroup>
        </section>
      ),
    };
    return componentMapping;
  }, [options, required, question, formik, questionIndex, errors, values]);
  return (
    <article className="   first:mt-3 p-4  flex flex-col gap-3 mb-3 rounded-lg   border-violet-900 bg-white">
      <h1 className=" text-base font-medium">
        {question}
        {required && <span className=" text-destructive">*</span>}
      </h1>
      <section className=" mt-2">
        {renderQuestionType[type as keyof typeof renderQuestionType]}
      </section>
    </article>
  );
};
export default QuestionCard;
