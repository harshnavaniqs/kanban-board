import { Card, CardHeader, CardBody, CardFooter,Image,Stack,Heading,Button,Text, Flex,Box, Center,Icon,Avatar, AvatarBadge, AvatarGroup  } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

export default function KanbanCard({ cardData, userData,avatar }) {
    const user = userData.find(user => user.id === cardData.userId)
    
    return (
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
            variant='outline'
            w={350}
    >
       
        {/* <Stack> */}
            <CardBody p={2}>
                    <Stack>
                        <Flex justify={'space-between'} fontSize={12} color='gray'>
                            <div>
                                {cardData.id}
                            </div>
                        <div>{
                        avatar?<Avatar name={user.name} w={5} mr={2} h={5} size={'xs'} >
                        {user.available?<AvatarBadge boxSize='1em' bg='yellow.400' />:<AvatarBadge boxSize='1em' bg='gray.400' />} 
                            </Avatar>:""
                            }
                        
                        
                        </div>      
                        
                        </Flex>
                </Stack>
                
                <Stack p={0} >

                    <Text fontSize={15} align={'left'} fontWeight={'500'}>
                        {cardData.title}
</Text>
                </Stack>

                <Stack py={2}>
                    <Flex alignItems={'center'} >
                        <SettingsIcon border='1px' borderColor='gray.200' borderWidth={1} w={6} h={'22px'} p={'3px'} borderRadius={3}></SettingsIcon> 
                        {cardData.tag.map(item =>
                              <Flex align={'left'} border='1px' borderColor='gray.200' borderWidth={1} borderRadius={5} ml={2} px={1} alignItems={'center'} h='22px' alignSelf={'center'}>
                              <Icon viewBox='0 0 200 200' color='gray.400' w={3}  mr={1} alignItems={'center'}>
        <path
          fill='currentColor'
          d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
                                  </Icon>
                                  <Flex>
                                      
                                          <Text fontSize={14} color='gray.600' >
                            {item}
      </Text>
                                  </Flex>
                         
                              </Flex>
                            )}
                      
                       
                    </Flex>

                </Stack>
            </CardBody>

        {/* </Stack> */}
        </Card>
    )
}

