// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import logo from "assets/logo.jpeg";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <img
        src={logo}
        alt="logo"
        style={{ width: "80%", marginRight: 30, marginBottom: 20 }}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
