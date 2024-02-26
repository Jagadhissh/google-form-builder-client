import { NavLink } from "react-router-dom";
import Container from "./Container";
import AppLogo from "./Logo";
import { ListBulletIcon, PlusIcon } from "@radix-ui/react-icons";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li className="">
      <NavLink
        className=" gap-1 justify-center transition-all inline-flex items-center flex-row text-blue-600 px-3 py-1.5   rounded-xl text-sm  font-medium    hover:bg-[#f5efff] hover:text-violet-800"
        to={href}
      >
        {children}
      </NavLink>
    </li>
  );
};
const AppHeader = () => {
  return (
    <header className="min-h-12 px-4 py-4 border-b flex items-center flex-col sm:flex-row  bg-white">
      <Container className="flex-col sm:flex-row  flex   max-sm:gap-2 sm:gap-4 items-center ">
        <AppLogo />
        <article className=" flex flex-col max-sm:text-center">
          <h1 className=" text-lg text-slate-800  font-medium">Google Forms</h1>
          <span className=" opacity-90 text-sm">
            Create and publish your forms
          </span>
        </article>
        <article className=" flex flex-row gap-4 items-center sm:ml-auto">
          <ul className=" flex flex-row gap-2">
            <LinkItem href="/forms/all">
              {" "}
              <ListBulletIcon /> Forms
            </LinkItem>
            <LinkItem href="/forms/create">
              <PlusIcon /> Create form
            </LinkItem>
          </ul>
        </article>
      </Container>
    </header>
  );
};
export default AppHeader;
