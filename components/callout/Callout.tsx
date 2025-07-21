import { FC } from "react";
import { Box, Icon, useStyleConfig } from "@chakra-ui/react";
import { RiInformationFill } from "react-icons/ri";
import { WithChildren } from "@/types";

interface CalloutProps extends WithChildren {
  size: "sm" | "md";
  variant: "info" | "success" | "warning" | "error";
}

const Callout: FC<CalloutProps> = ({ size, variant, children }) => {
  const styles = useStyleConfig("Callout", { size, variant });
  // Usar siempre el mismo icono para todos los callouts
  const icon = RiInformationFill;

  return (
    <Box __css={styles}>
      <Box>
        <Icon boxSize="6" as={icon} />
      </Box>
      {children}
    </Box>
  );
};

export default Callout;
