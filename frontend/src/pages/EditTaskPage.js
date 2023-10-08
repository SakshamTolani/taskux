import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast,
    Select,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const EditTaskPage = () => {
    let navigate = useNavigate();
    let params = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    let toast = useToast();
    let { authTokens } = useContext(AuthContext);

    let editTask = async () => {
        let response = await fetch(`/api/tasks/${params.id}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json();
        if (response.status === 200) {
            setTitle(data.title);
            setDesc(data.desc);
            setDueDate(data.due_date);
            setPriority(data.priority)
            setStatus(data.status);
        } else {
            toast({
                title: 'Some Error Occured',
                description: data.details,
                status: 'danger',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    let updateTask = async(e)=>{
        e.preventDefault();
        let response = await fetch(`/api/tasks/edit/${params.id}/`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + String(authTokens.access)
                },
                body: JSON.stringify({ 'title': title,'desc':desc, 'due_date': dueDate, 'priority':priority,'status':status }),
            },
        )
        let data = await response.json();
        if (response.status === 200) {
            toast({
                title: 'Updated Successfully!',
                description: `Task Updated Successfully!`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            navigate("/")
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

    useEffect(() => {
        editTask();
    }, [])


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    Task Create/Edit
                </Heading>
                <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={title && title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input
                        placeholder="Description"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={desc && desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </FormControl>
                <FormControl id="due_date" isRequired>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                        placeholder="2023-08-29"
                        _placeholder={{ color: 'gray.500' }}
                        type="date"
                        value={dueDate && dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </FormControl>
                <FormControl id="priority" isRequired>
                    <FormLabel>Priority</FormLabel>
                    <Select placeholder='Select option' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                        <option value='MODERATE'>Moderate</option>
                        <option value='IMPORTANT'>Important</option>
                    </Select>
                </FormControl>
                <FormControl id="status" isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select placeholder='Select option' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value='PENDING'>Pending</option>
                        <option value='COMPLETED'>Completed</option>
                    </Select>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        onClick={() => navigate("/")}
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        onClick={(e)=>updateTask(e)}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default EditTaskPage;