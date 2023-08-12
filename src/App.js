import logo from './logo.svg';
import './App.css';
import KanbanCard from './components/KanbanCard';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Stack,Select } from '@chakra-ui/react'

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

      <div className="App">
      <Stack> 
      <Select placeholder='Group by' value={selectedGrouping} onChange={handleGroupingChange}>
  <option value='status'>Status</option>
  <option value='userId'>User Name</option>
  <option value='priority'>Priority</option>
        </Select>
        <Select placeholder='Sort by' value={selectedSorting} onChange={handleSortingChange}>
  <option value='priority'>Priority</option>
  <option value='title'>Title</option>
          </Select>
          </Stack> 
          <div>
    <div className="kanban-board">
      {sortedGroups.map(({ groupKey, items }) => (
        <div className="kanban-column" key={groupKey}>
          <h2>{groupKey}</h2>
          {items.map(item => (
            <KanbanCard key={item.id} cardData={item} userData={users} />
          ))}
        </div>
      ))}
    </div>
  </div>
       
        
      </div>
      </ChakraProvider>
  );
}

export default App;
