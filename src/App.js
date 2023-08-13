// import logo from './logo.svg';
import './App.css';
// import KanbanCard from './components/KanbanCard';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Stack,Select,  Menu, MenuButton, MenuList,Button, Flex,Text} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Board from './containers/Board'
function App() {

  const [tickets, setTickets] = useState([]);
  const [users,  setUsers] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('status');
  const [selectedSorting, setSelectedSorting] = useState('priority');

  useEffect(() => {
    fetch('https://apimocha.com/quicksell/data')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
       
      });
  }, []);

  const handleGroupingChange = event => {
    setSelectedGrouping(event.target.value);
  };

  const handleSortingChange = event => {
    setSelectedSorting(event.target.value);
  };

  const userIdToNameMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  const groupedData = tickets.reduce((groups, item) => {
    var groupKey = item[selectedGrouping];
    if (selectedGrouping === 'userId') {
      groupKey = userIdToNameMap[item.userId];
    }
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});

  const sortedGroups = Object.entries(groupedData).map(([groupKey, items]) => ({
    groupKey,
    items: items.sort((a, b) => {
      if (selectedSorting === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    }),
  }));
  return (
    <ChakraProvider>

      <div className="App" >
        <Flex >
      <Menu>
  <MenuButton as={Button} leftIcon={<HamburgerIcon/>} w={120} m={3} colorScheme='gray' variant='outline'>
    Display
  </MenuButton>
  <MenuList p={2}>
            <Stack>
              <Flex alignItems={'center'} justify={'space-between'}>
                <Text mr={1}>Grouping</Text>
                <Select placeholder='Group by' value={selectedGrouping} onChange={handleGroupingChange} w={200}>
  <option value='status'>Status</option>
  <option value='userId'>Users</option>
  <option value='priority'>Priority</option>
              </Select>
              </Flex> 
              <Flex alignItems={'center'} justify={'space-between'}>
                <Text mr={1}>Ordering</Text>
              <Select placeholder='Sort by' value={selectedSorting} onChange={handleSortingChange} w={200}>
  <option value='priority'>Priority</option>
  <option value='title'>Title</option>
              </Select>
              </Flex>
            </Stack>
  </MenuList>
</Menu>
</Flex>
        <Flex bg={'gray.50'} h={'100vh'}>
        
          <Board sortedGroups={sortedGroups} users={users} selectedGrouping={selectedGrouping}/>   
  </Flex>
       
        
      </div>
      </ChakraProvider>
  );
}

export default App;
