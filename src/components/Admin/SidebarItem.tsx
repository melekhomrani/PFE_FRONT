import { Text } from '@chakra-ui/react';
import { MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';


interface ItemProps {
  title: string;
  to: string;
  icon: any;
}

function MySidebarItem({ title, to, icon }: ItemProps) {
  return (
    <NavLink to={to}>
      {({ isActive }) =>
        <>
          <MenuItem
            active={isActive}
            style={{
              color: isActive ? "red" : "white",
              backgroundColor: isActive ? "white" : "transparent",
              borderRadius: "5px",
            }}
            icon={icon}
          >
            <Text _hover={{
              color: isActive ? "red" : "gray.300",
              background: isActive ? "white" : "white.400"
            }}>{title}</Text>
          </MenuItem>
        </>
      }
    </NavLink>
  )
}

export default MySidebarItem