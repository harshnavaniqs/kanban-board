import KanbanCard from "../components/KanbanCard";
import IconSelector from "../components/IconSelector";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
const priorityLabels = {
      0: "No priority",
      1: "Low",
      2: "Medium",
      3: "High",
      4: "Urgent",
};
const priorityColumns = ["0", "1", "2", "3", "4"];

const statusColumns = ["Todo", "In progress", "Backlog", "Done", "Canceled"];
export default function Board({ sortedGroups, users, selectedGrouping }) {
      if (selectedGrouping === "status" || selectedGrouping === "priority") {
            const myArr =
                  selectedGrouping === "status"
                        ? statusColumns
                        : priorityColumns;
            return (
                  <Flex bg={"gray.50"} direction={["column", "row"]}>
                        {myArr.map((column) => (
                              <Stack key={column} m={3} w={['88vw',350]}>
                                    <Flex
                                          justify={"space-between"}
                                          alignItems={"center"}
                                    >
                                          <Flex alignItems={"center"}>
                                                <IconSelector
                                                      groupKey={column}
                                                      userData={users}
                                                />
                                                <Text
                                                      fontWeight={500}
                                                      fontSize={"13px"}
                                                      textAlign={"left"}
                                                      mr={"2"}
                                                >
                                                      {selectedGrouping ===
                                                      "status"
                                                            ? column
                                                            : priorityLabels[
                                                                    column
                                                              ]}
                                                </Text>
                                                <Text
                                                      fontSize={"13px"}
                                                      color={"gray.500"}
                                                >
                                                      {
                                                            sortedGroups.find(
                                                                  (group) =>
                                                                        group.groupKey ===
                                                                        column
                                                            )?.items.length
                                                      }
                                                </Text>
                                          </Flex>
                                          <AddIcon w={3} />
                                    </Flex>
                                    {sortedGroups
                                          .find(
                                                (group) =>
                                                      group.groupKey === column
                                          )
                                          ?.items.map((item) => (
                                                <KanbanCard
                                                      key={item.id}
                                                      cardData={item}
                                                      userData={users}
                                                      avatar={true}
                                                />
                                          ))}
                              </Stack>
                        ))}
                  </Flex>
            );
      } else {
            return (
                  <Flex bg={"gray.50"} direction={["column", "row"]}>
                        {sortedGroups.map(({ groupKey, items }) => (
                              <Stack key={groupKey} m={3}>
                                    <Flex
                                          justify={"space-between"}
                                          alignItems={"center"}
                                    >
                                          <Flex alignItems={"center"}>
                                                <IconSelector
                                                      groupKey={groupKey}
                                                      userData={users}
                                                />
                                                <Text
                                                      fontWeight={500}
                                                      fontSize={"13px"}
                                                      textAlign={"left"}
                                                      mr={"2"}
                                                >
                                                      {groupKey}
                                                </Text>
                                                <Text fontSize={"13px"}>
                                                      {items.length}
                                                </Text>
                                          </Flex>
                                          <AddIcon w={3} />
                                    </Flex>
                                    {items.map((item) => (
                                          <KanbanCard
                                                key={item.id}
                                                cardData={item}
                                                userData={users}
                                                avatar={false}
                                          />
                                    ))}
                              </Stack>
                        ))}
                  </Flex>
            );
      }
}
