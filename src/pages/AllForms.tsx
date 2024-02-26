import { useEffect, useMemo } from "react";
import { useGoogleFormsQuery } from "../api/formsbuilder.api";
import Container from "../shared/Container";
import DataLoading from "../shared/DataLoading";
import IPostedFormDataShape from "./types/IPostedFormDataShape";
import PostedFormCard from "./components/PostedFormCard";
import { Button } from "../ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const AllForms = () => {
  const { data, isLoading, isSuccess } = useGoogleFormsQuery(3);

  const formsList = useMemo(() => data?.response, [data]);
  useEffect(() => {
    console.log("Googles forms data: ", formsList);
  }, [formsList]);
  const navigate = useNavigate();
  const navigateToCreate = () => {
    navigate("/forms/create");
  };
  return (
    <section>
      <Container className=" flex flex-col px-4 py-4">
        <div className=" flex  items-center  max-sm:gap-1 flex-row justify-between">
          <article className=" flex flex-col">
            <h1 className=" text-xl  sm:text-2xl font-medium">All Forms</h1>
            <p className=" text-sm opacity-90">
              A list of all the forms you have created
            </p>
          </article>

          <Button variant="default" onClick={navigateToCreate}>
            <FilePlusIcon className="mr-2 h-4 w-4" /> Add Form
          </Button>
        </div>
        <section className=" mt-3">
          {isLoading ? (
            <DataLoading />
          ) : (
            <>
              {isSuccess && formsList?.length > 0 ? (
                <section className=" grid md:grid-cols-2 gap-2">
                  {formsList?.map((form: IPostedFormDataShape, key: number) => (
                    <PostedFormCard {...form} key={key} />
                  ))}
                </section>
              ) : (
                <h1>No forms found</h1>
              )}
            </>
          )}
        </section>
      </Container>
    </section>
  );
};

export default AllForms;
