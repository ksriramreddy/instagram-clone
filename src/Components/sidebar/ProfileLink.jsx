import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {useSelector} from 'react-redux'

const ProfileLink = () => {
	const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
	return (
		<Tooltip
			hasArrow
			label={"Profile"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={`/${authUser?.username}`}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<Avatar size={"sm"} src={authUser?.profilePicUrl || ""} border={'2px white solid'} />
				<Box display={{ base: "none", md: "block" }} backgroundColor={'transparent'}>Profile</Box>
			</Link>
		</Tooltip>
	);
};

export default ProfileLink;