import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface MyLinkProps {
  to: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  children?: React.ReactNode;
}

function MyLink({ to, target, children, ...rest }: MyLinkProps) {
  return (
    <Link {...rest} as={RouterLink} to={to} target={target}>{children}</Link>
  )
}

export default MyLink