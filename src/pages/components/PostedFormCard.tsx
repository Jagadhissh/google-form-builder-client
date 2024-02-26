import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import DocIcon from "../../ui/icons/DocumentIcon";
import IPostedFormDataShape from "../types/IPostedFormDataShape";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "../../ui/alert-dialog";
import { useDeleteMutation } from "../../api/formsbuilder.api";

const PostedFormCard = (props: IPostedFormDataShape) => {
  const navigate = useNavigate();
  const [deletePost, _deletedResponse] = useDeleteMutation();

  const navigateToUpdate = () => {
    navigate(`/forms/update/${props._id}`);
  };
  const navigateToPreview = (id: string) => {
    navigate(`/forms/preview/${id}`);
  };

  return (
    <section className="bg-white flex flex-col sm:flex-row flex-nowrap border p-4 gap-3 items-center rounded-lg shadow-sm ">
      <DocIcon />
      <section className=" flex-grow">
        <h1 className=" text-violet-800 font-medium">{props.title}</h1>
        <p className=" text-sm"> {props.description}</p>
      </section>
      <section className="flex justify-center md:justify-end">
        <Button
          variant={"link"}
          className=" hover:bg-[#f5efff] hover:text-violet-800"
          onClick={navigateToUpdate}
        >
          <Pencil2Icon />
        </Button>
        <Button
          variant={"link"}
          className=" hover:bg-[#f5efff] hover:text-violet-800"
          onClick={() => navigateToPreview(props._id)}
        >
          <EyeOpenIcon />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"link"}
              className=" hover:bg-[#f5efff] hover:text-violet-800"
            >
              <TrashIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=" w-3/12">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete form?</AlertDialogTitle>
              <AlertDialogDescription>
                This can’t be undone and it will be removed .
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className=" flex flex-row gap-2 !items-center !justify-center">
              <AlertDialogAction
                variant="destructive"
                onClick={() => deletePost(props._id)}
              >
                Continue
              </AlertDialogAction>
              <AlertDialogCancel className=" m-0">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </section>
  );
};
export default PostedFormCard;
