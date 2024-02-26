import { useNavigate, useParams } from "react-router-dom";
import Container from "../shared/Container";
import DataLoading from "../shared/DataLoading";
import { ErrorResponse, useFormQuery } from "../api/formsbuilder.api";
import { useCallback, useMemo } from "react";
import QuestionCard from "./components/QuestionCard";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { QuestionShape } from "../types/FormBuilderShape";
import * as yup from "yup";
import ErrorMessage from "../shared/ErrorMessage";

const genarateValidationSchema = (questions: QuestionShape[]) => {
  const shape: { [key: string]: yup.StringSchema } = {};
  questions.forEach((question, index) => {
    const key = `questions[${index}].answer`;
    let validator = yup.string();
    if (question.required) {
      validator = validator.required("This field is required");
    }
    shape[key] = validator;
  });
  return yup.object().shape(shape);
};

export interface PreviewFormValuesType {
  questions: { question: string; answer: string }[];
}
const ViewForm = () => {
  const { formId } = useParams();
  const {
    data,
    isLoading,
    error: formLoadingError,
  } = useFormQuery(formId, {
    skip: !formId,
  });
  const form = data?.response;

  const validationSchema = genarateValidationSchema(form?.questions || []);
  const initialValues = useMemo(
    () => ({
      questions:
        form?.questions.map((question) => ({
          question: question.question,
          answer: "",
        })) || [],
    }),
    [form]
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const navigate = useNavigate();
  const cancenlForm = useCallback(() => {
    navigate("/forms/all");
  }, []);
  return (
    <section>
      <Container className=" flex flex-col px-4 py-4">
        <div className=" flex justify-between">
          <article className=" flex flex-col"></article>
        </div>
        <section className=" mt-3 ">
          {isLoading ? (
            <DataLoading />
          ) : (
            <>
              {(formLoadingError && <ErrorMessage {...formLoadingError} />) || (
                <>
                  <section className="flex flex-col ">
                    <article className="w-full md:w-8/12   mx-auto ">
                      <section className="rounded-lg border-t-8 border-violet-900 bg-white">
                        <div className="p-4">
                          <h1 className=" text-2xl font-medium">
                            {form?.title}
                          </h1>
                          <p className=" text-sm opacity-90">
                            {form?.description}
                          </p>
                        </div>
                        <div className="p-4 border-t">
                          <p className=" text-destructive text-sm">
                            {" "}
                            * Indicates required question
                          </p>
                        </div>
                      </section>
                      {/* Questions list */}
                      <section className=" flex flex-col gap-3">
                        {form?.questions.map((question, index) => {
                          return (
                            <QuestionCard
                              questionIndex={index}
                              formik={formik}
                              key={index}
                              {...question}
                            />
                          );
                        })}
                        <section className=" p-4  justify-center flex flex-row gap-2">
                          <Button
                            size={"sm"}
                            className=" text-destructive hover:text-destructive"
                            variant={"outline"}
                            onClick={cancenlForm}
                          >
                            Cancel{" "}
                          </Button>
                          <Button
                            variant={"default"}
                            className=" items-center gap-2"
                            size={"sm"}
                            disabled={!formik.isValid}
                          >
                            Submit <ArrowRightIcon />{" "}
                          </Button>
                        </section>
                      </section>
                    </article>
                  </section>
                </>
              )}
            </>
          )}
        </section>
      </Container>
    </section>
  );
};

export default ViewForm;
