import { ChangeEvent, FC } from "react";
import {
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiComputerLine, RiMoonClearLine, RiSunLine } from "react-icons/ri";
import ToggleThemeButton from "./ThemeToggleButton";
import { WithChildren } from "@/types";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: RiSunLine,
  },
  {
    value: "dark",
    label: "Dark",
    icon: RiMoonClearLine,
  },
  {
    value: "system",
    label: "System",
    icon: RiComputerLine,
  },
];

export const ThemeMenu: FC<WithChildren> = ({
  children = <ToggleThemeButton />,
}) => {
  const { setColorMode } = useColorMode();
  
  // Move hooks outside of callbacks
  const menuItemColor = useColorModeValue("gray.700", "gray.300");
  const menuItemHoverBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const menuItemHoverColor = useColorModeValue("gray.900", "white");
  const iconColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Menu>
      {children}
      <MenuList
        fontSize="sm"
        bgColor={useColorModeValue("white", "whiteAlpha.200")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
        backdropFilter="blur(10px)"
        boxShadow={useColorModeValue("lg", "0 8px 32px rgba(0, 0, 0, 0.4)")}
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "md",
          background: useColorModeValue("white", "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"),
          backdropFilter: "blur(10px)",
          zIndex: -1,
        }}
      >
        {themes.map(({ value, label, icon }) => (
          <MenuItem
            key={value}
            onClick={() => setColorMode(value)}
            color={menuItemColor}
            bg="transparent"
            _hover={{
              bg: menuItemHoverBg,
              color: menuItemHoverColor,
            }}
            _focus={{
              bg: menuItemHoverBg,
              color: menuItemHoverColor,
            }}
            icon={
              <Icon display="flex" w="5" h="5" color={iconColor} as={icon} />
            }
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export const ThemeSelect = () => {
  const { colorMode, setColorMode } = useColorMode();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setColorMode(event.target.value);
  };

  return (
    <>
      <Text
        fontWeight="semibold"
        color={useColorModeValue("gray.500", "gray.300")}
        mt="4"
        mb="2"
      >
        Switch theme
      </Text>
      <Select value={colorMode} onChange={handleChange}>
        {themes.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </>
  );
};
