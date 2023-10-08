import React, { useContext, useEffect, useState } from 'react'
import {
    Avatar,
    Badge,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Table,
    TableContainer,
    Tag,
    TagLabel,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext"
import { AddIcon, CheckCircleIcon, DeleteIcon, EditIcon, HamburgerIcon, SearchIcon, SpinnerIcon } from '@chakra-ui/icons';
import { RiFilter3Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

const Tables = () => {
    const toast = useToast()
    let { authTokens, logoutUser, addTask } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [query, setQuery] = useState("");
    const [priorityQuery, setPriorityQuery] = useState("");
    const [statusQuery, setStatusQuery] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        getTasks();
    }, [query, statusQuery, priorityQuery])

    let searchTask = async () => {
        onClose();
    }


    let getTasks = async () => {
        let response = await fetch(`/api/tasks/?title=${query}&desc=${query}&status=${statusQuery}&priority=${priorityQuery}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json();
        if (response.status === 200) {
            setTasks(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        }
    }

    let completeTask = async (e, id) => {
        e.preventDefault();
        let response = await fetch(`/api/tasks/completed/${id}/`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + String(authTokens.access)
                },
            },
        )
        let data = await response.json();
        if (response.status === 200) {
            toast({
                title: 'Task Completion Update',
                description: data,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            getTasks();
        }
        else {
            toast({
                title: 'Some Error Occured',
                description: data.details,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    let deleteTask = async (id) => {
        let response = await fetch(`/api/tasks/delete/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + String(authTokens.access)
            }
        })
        console.log(response);
        if (response.status === 204) {
            toast({
                title: 'Deletion Successful',
                description: response.statusText,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            getTasks();
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        }
        else {
            toast({
                title: 'Some Error Occured',
                description: response.statusText,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Box m={2}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} m={4}>
                <Image name='Taskux Logo' h={{base:50,lg:20}} src='https://res.cloudinary.com/sakshamtolani/image/upload/v1693336313/logo2_ikgsvn.png' />
                <Box
                    as="a"
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.200', 'gray.700'),
                        cursor: "pointer"
                    }}
                >
                    <Button onClick={onOpen} size={{ base: "sm", lg: "md" }}><SearchIcon m={1} /></Button>
                    <Drawer placement={"top"} onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader borderBottomWidth='1px'></DrawerHeader>
                            <DrawerBody>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                        <SearchIcon color='gray.500' />
                                    </InputLeftElement>
                                    <Input type='search' color='gray.500' placeholder='Search for tasks' name={query} value={query} onChange={(e) => setQuery(e.target.value)} />
                                    <InputRightElement width='4.5rem'>
                                        <Button onClick={searchTask}>
                                            Submit
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} colorScheme='blue' mr={{ base: 1 }} size={{ base: "sm", lg: "md" }}>
                            <RiFilter3Line fontSize={"20px"} />
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup defaultChecked="ALL" defaultValue="ALL" title='Priority' type='radio'>
                                <MenuItemOption value='ALL' onClick={() => setPriorityQuery("")}>ALL</MenuItemOption>
                                <MenuItemOption value='MODERATE' onClick={() => setPriorityQuery("MODERATE")}>MODERATE</MenuItemOption>
                                <MenuItemOption value='IMPORTANT' onClick={() => setPriorityQuery("IMPORTANT")}>IMPORTANT</MenuItemOption>
                            </MenuOptionGroup>
                            <MenuDivider />
                            <MenuOptionGroup title='Status' defaultChecked="ALL" defaultValue="ALL" type='radio'>
                                <MenuItemOption value='ALL' onClick={() => setStatusQuery("")}>ALL</MenuItemOption>
                                <MenuItemOption value='PENDING' onClick={() => setStatusQuery("PENDING")} >PENDING</MenuItemOption>
                                <MenuItemOption value='COMPLETED' onClick={() => setStatusQuery("COMPLETED")}>COMPLETED</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                    <Button leftIcon={<AddIcon />} colorScheme='blue' variant='solid' onClick={(e) => addTask(e)} size={{ base: "sm", lg: "md" }}>
                        Add Task
                    </Button>
                </Flex>
            </Flex>
            <TableContainer m={{base:1,lg:5}}>
                <Table variant='simple'>
                    <Thead visibility={!tasks.length && "hidden"}>
                        <Tr>
                            <Th>TITLE</Th>
                            <Th>DESCRIPTION</Th>
                            <Th>DUE DATE</Th>
                            <Th>STATUS</Th>
                            <Th>PRIORITY</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tasks.length != 0 ? (tasks.map(task => (
                            <Tr key={task.id}>
                                <Td>{task.title}</Td>
                                <Td>{task.desc}</Td>
                                <Td>{task.due_date}</Td>
                                <Td>
                                    <Tag colorScheme={task.status == "COMPLETED" ? 'green' : 'red'} borderRadius='full'>
                                        <TagLabel textTransform={"uppercase"} m={1}>{task.status} </TagLabel>
                                        {task.status == "COMPLETED" ? <CheckCircleIcon fontSize={"sm"} /> : <SpinnerIcon fontSize={"sm"} />}
                                    </Tag>
                                </Td>
                                <Td><Badge variant="solid" colorScheme={task.priority == "IMPORTANT" ? 'red' : 'yellow'} fontSize="xs">{task.priority}</Badge></Td>
                                <Td><Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon />}
                                        variant='outline'
                                    />
                                    <MenuList>
                                        <MenuItem icon={<EditIcon color={"orange"} />} onClick={() => navigate(`/edit/${task.id}`)}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem icon={<DeleteIcon />} onClick={() => deleteTask(task.id)}>
                                            Delete
                                        </MenuItem>
                                        {task.status === "PENDING" &&
                                            <MenuItem icon={<CheckCircleIcon color={"green"} />} onClick={(e) => completeTask(e, task.id)}>
                                                Mark as Completed
                                            </MenuItem>
                                        }
                                    </MenuList>
                                </Menu></Td>
                            </Tr>
                        ))) : (<></>)}
                    </Tbody>
                </Table>
            </TableContainer>

        </Box>
    )
}

export default Tables;