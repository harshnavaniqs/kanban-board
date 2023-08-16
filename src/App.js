// import logo from './logo.svg';
import "./App.css";
// import KanbanCard from './components/KanbanCard';
import React, { useState, useEffect } from "react";
import {
      ChakraProvider,
      Stack,
      Select,
      Menu,
      MenuButton,
      MenuList,
      Button,
      Flex,
      Text,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Board from "./containers/Board";
import { Hidden } from "@mui/material";
function App() {
      const [tickets, setTickets] = useState([]);
      const [users, setUsers] = useState([]);
      const [selectedGrouping, setSelectedGrouping] = useState(() => {
            return localStorage.getItem("selectedGrouping") || "status";
      });
      const [selectedSorting, setSelectedSorting] = useState(() => {
            return localStorage.getItem("selectedSorting") || "priority";
      });

      useEffect(() => {
            fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
                  .then((response) => response.json())
                  .then((data) => {
                        setTickets(data.tickets);
                        setUsers(data.users);
                  });
      }, []);

      const handleGroupingChange = (event) => {
            setSelectedGrouping(event.target.value);
            localStorage.setItem("selectedGrouping", event.target.value);
      };

      const handleSortingChange = (event) => {
            setSelectedSorting(event.target.value);
            localStorage.setItem("selectedSorting", event.target.value);
      };

      const userIdToNameMap = users.reduce((map, user) => {
            map[user.id] = user.name;
            return map;
      }, {});

      const groupedData = tickets.reduce((groups, item) => {
            var groupKey = item[selectedGrouping];
            if (selectedGrouping === "userId") {
                  groupKey = userIdToNameMap[item.userId];
            }
            if (!groups[groupKey]) {
                  groups[groupKey] = [];
            }
            groups[groupKey].push(item);
            return groups;
      }, {});

      const sortedGroups = Object.entries(groupedData).map(
            ([groupKey, items]) => ({
                  groupKey,
                  items: items.sort((a, b) => {
                        if (selectedSorting === "priority") {
                              return b.priority - a.priority;
                        } else {
                              return a.title.localeCompare(b.title);
                        }
                  }),
            })
      );
      return (
            <ChakraProvider>
                  <div className="App">
                        <Flex>
                              <Menu>
                                    <MenuButton
                                          as={Button}
                                          leftIcon={<HamburgerIcon />}
                                          w={100}
                                          m={3}
                                          h={8}
                                          colorScheme="gray"
                                          variant="outline"
                                          fontSize={12}
                                    >
                                          Display
                                    </MenuButton>
                                    <MenuList p={2} w={260}>
                                          <Stack>
                                                <Flex
                                                      alignItems={"center"}
                                                      justify={"space-between"}
                                                >
                                                      <Text
                                                            mr={1}
                                                            color={"gray.500"}
                                                            fontSize={12}
                                                            textAlign={"left"}
                                                      >
                                                            Grouping
                                                      </Text>
                                                      <Select
                                                            value={
                                                                  selectedGrouping
                                                            }
                                                            onChange={
                                                                  handleGroupingChange
                                                            }
                                                            w={150}
                                                            fontSize={13}
                                                      >
                                                            <option value="status">
                                                                  Status
                                                            </option>
                                                            <option value="userId">
                                                                  Users
                                                            </option>
                                                            <option value="priority">
                                                                  Priority
                                                            </option>
                                                      </Select>
                                                </Flex>
                                                <Flex
                                                      alignItems={"center"}
                                                      justify={"space-between"}
                                                >
                                                      <Text
                                                            mr={1}
                                                            color={"gray.500"}
                                                            fontSize={12}
                                                      >
                                                            Ordering
                                                      </Text>
                                                      <Select
                                                            value={
                                                                  selectedSorting
                                                            }
                                                            onChange={
                                                                  handleSortingChange
                                                            }
                                                            w={150}
                                                            fontSize={13}
                                                      >
                                                            <option value="priority">
                                                                  Priority
                                                            </option>
                                                            <option value="title">
                                                                  Title
                                                            </option>
                                                      </Select>
                                                </Flex>
                                          </Stack>
                                    </MenuList>
                              </Menu>
                        </Flex>
                        <Flex
                              bg={"gray.50"}
                              minH={["100%", "100vh"]}
                              justify={["center", "left"]}
                        >
                              <Board
                                    sortedGroups={sortedGroups}
                                    users={users}
                                    selectedGrouping={selectedGrouping}
                              />
                        </Flex>
                  </div>
            </ChakraProvider>
      );
}

export default App;
