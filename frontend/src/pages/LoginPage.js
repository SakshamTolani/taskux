import React, { useContext, useState } from 'react'
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  ModalFooter,
  ModalBody
} from '@chakra-ui/react'
import AuthContext from '../context/AuthContext'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {
  let { loginUser,registerUser } = useContext(AuthContext);
  const [rfirstname, setRfirstname] = useState("");
  const [rlastname, setRlastname] = useState("");
  const [remail, setRemail] = useState("");
  const [rpassword, setRpassword] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link onClick={onOpen} color={'blue.500'}>Not a user, Register?</Link>
              <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Register</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex
                      minH={'100vh'}
                      align={'center'}
                      justify={'center'}
                      bg={useColorModeValue('gray.50', 'gray.800')}>
                      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                          <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                          </Heading>
                          <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                          </Text>
                        </Stack>
                        <Box
                          rounded={'lg'}
                          bg={useColorModeValue('white', 'gray.700')}
                          boxShadow={'lg'}
                          p={8}>
                          <Stack spacing={4}>
                            <HStack>
                              <Box>
                                <FormControl id="firstName" isRequired>
                                  <FormLabel>First Name</FormLabel>
                                  <Input type="text" value={rfirstname} onChange={(e)=>setRfirstname(e.target.value)}/>
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl id="lastName">
                                  <FormLabel>Last Name</FormLabel>
                                  <Input type="text" value={rlastname} onChange={(e)=>setRlastname(e.target.value)}/>
                                </FormControl>
                              </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                              <FormLabel>Email address</FormLabel>
                              <Input type="email" value={remail} onChange={(e)=>setRemail(e.target.value)}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                              <FormLabel>Password</FormLabel>
                              <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={rpassword} onChange={(e)=>setRpassword(e.target.value)}/>
                                <InputRightElement h={'full'}>
                                  <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                              <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                onClick={(e)=>registerUser(e,rfirstname,rlastname,remail,rpassword)}
                                color={'white'}
                                _hover={{
                                  bg: 'blue.500',
                                }}>
                                Sign up
                              </Button>
                            </Stack>
                            <Stack pt={6}>
                              <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} onClick={onClose}>Login</Link>
                              </Text>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={(e) => loginUser(e, email, password)}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      {/* <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex> */}
    </Stack>
  )
}

export default LoginPage;