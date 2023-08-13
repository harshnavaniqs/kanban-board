import { TimeIcon ,RepeatClockIcon,CheckCircleIcon,CloseIcon,CalendarIcon,TriangleDownIcon,WarningIcon,ChevronUpIcon,BellIcon,MinusIcon} from "@chakra-ui/icons";
import { Avatar,AvatarBadge } from "@chakra-ui/react";
export default function IconSelector({ groupKey,userData }) {
    const user = userData.find(user => user.name === groupKey)
      if (groupKey === "In progress") return <TimeIcon w={3} mr={2} />;
      if (groupKey === "Backlog") return <RepeatClockIcon w={3} mr={2} />;
      if (groupKey === "Done") return <CheckCircleIcon w={3} mr={2} />;
      if (groupKey === "Canceled") return <CloseIcon w={3} mr={2} />;
      if (groupKey === "Todo") return <CalendarIcon w={3} mr={2} />;
      if (groupKey === '0') return <TriangleDownIcon w={3} mr={2} />;
      if (groupKey === '4') return <WarningIcon w={3} mr={2} />;
      if (groupKey === '2') return <ChevronUpIcon w={3} mr={2} />;
      if (groupKey === '3') return <BellIcon w={3} mr={2} />;
      if (groupKey === '1') return <MinusIcon w={3} mr={2} />;
      else return <Avatar name={user.name} w={5} mr={2} h={5} size={'xs'}>
      {user.available?<AvatarBadge boxSize='1em' bg='yellow.400' />:<AvatarBadge boxSize='1em' bg='gray.400' />} 
   </Avatar>
}
