import { useFormik } from "formik";
import Container from "../shared/Container";
import TextField from "../ui/forms/TextField";
import TextArea from "../ui/forms/TextArea";
import React, { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { ErrorResponse, useCreateMutation } from "../api/formsbuilder.api";
import { useToast } from "../ui/toast/use-toast";
import { FormShape } from "../types/FormBuilderShape";
import InputQuestionCard from "./components/InputQuestionCard";

const CreateForm = () => {
  const [save, response] = useCreateMutation();
  const { isLoading } = response;
  const initialValues: FormShape = useMemo(
    () => ({
      title: "",
      description: "",
      questions: [
        {
          question: "",
          type: "text", // Default to text type
          options: [], // Start with one empty option for multipleChoice/dropdown,
          required: false,
        },
      ],
    }),
    []
  );
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      save(values);
    },
  });

  const { toast } = useToast();
  useEffect(() => {
    const apiError = response.error as ErrorResponse;
    if (response.isError) {
      toast({
        title: "Failed",
        description: apiError.data?.message,
        variant: "destructive",
      });
    }
  }, [response]);
  useEffect(() => {
    if (response.isSuccess) {
      toast({
        title: "Success",
        description: "Your form has been created successfully!",
      });
    }
  }, [response]);
  const addQuestion = () => {
    const questions = [
      ...formik.values.questions,
      { question: "", type: "text", options: [], required: false },
    ];
    formik.setFieldValue("questions", questions);
  };

  const addOption = (questionIndex: number) => {
    const questions = [...formik.values.questions];
    questions[questionIndex].options.push("");
    formik.setFieldValue("questions", questions);
  };

  const handleQuestionChange = (
    e: React.FormEvent<HTMLDivElement>,
    questionIndex: number
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const questionType = `questions[${questionIndex}].[${name}]`;
    formik.setFieldValue(`questions[${questionIndex}].options`, []);
    formik.setFieldValue(questionType, value);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => {
    const { value } = e.target;
    const questions = [...formik.values.questions];
    questions[questionIndex].options[optionIndex] = value;
    formik.setFieldValue("questions", questions);
  };

  const handleRemoveOption = (
    questionIndex: number,
    optionIndex: number
  ): void => {
    const questions = [...formik.values.questions];
    const options = questions[questionIndex].options.filter(
      (_, idx) => idx !== optionIndex
    );
    questions[questionIndex].options = options;
    formik.setFieldValue("questions", questions);
  };

  const handleRemoveQuestion = (questionIndex: number): void => {
    const questions = formik.values.questions.filter(
      (_, idx) => idx !== questionIndex
    );
    formik.setFieldValue("questions", questions);
  };
  const changeQuestionValidation = (questionIndex: number, value: boolean) => {
    const questionType = `questions[${questionIndex}].required`;
    formik.setFieldValue(questionType, value);
  };
  return (
    <section className=" ">
      <Container className=" md:w-6/12 flex flex-col px-4 py-4 ">
        <form onSubmit={formik.handleSubmit} className="flex gap-4 flex-col ">
          <div className=" bg-white rounded-lg p-4 border-t-4 border-violet-800 flex  gap-4 flex-col ">
            <TextField
              id="title"
              name="title"
              type="text"
              label="Form Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <TextArea
              id="description"
              name="description"
              type="text"
              label="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>

          {formik.values.questions.map((question, questionIndex) => (
            <InputQuestionCard
              key={questionIndex}
              questionIndex={questionIndex}
              question={question}
              addOption={addOption}
              handleOptionChange={handleOptionChange}
              handleQuestionChange={handleQuestionChange}
              handleRemoveOption={handleRemoveOption}
              handleRemoveQuestion={handleRemoveQuestion}
              changeQuestionValidation={changeQuestionValidation}
            />
          ))}
          <section className=" flex flex-row px-4 py-2 bg-white rounded-lg gap-3">
            <Button
              variant="outline"
              disabled={isLoading}
              type="button"
              className=" text-violet-600 hover:text-violet-800"
              onClick={addQuestion}
            >
              Add Question
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save form
            </Button>
          </section>
        </form>
      </Container>
    </section>
  );
};
export default CreateForm;

//shivak@nhrtechnologies.com
