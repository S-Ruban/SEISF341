import './App.css';
import Login from './Login';
import Logout from './Logout';
import {useState} from 'react' ;
import {Outlet,Link} from 'react-router-dom'
import {Text, Heading, Flex, Link as LinkC, Grid, GridItem, Input, InputGroup, InputLeftElement, IconButton, Image} from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pplink, setPPLink] = useState();
  const childToParent = (n, e, l) => {
    setName(n);
    setEmail(e);
    setPPLink(l);
  }
  return (
    <div className="App">
      <Flex direction="row"
        bgColor="red.400"
        h="8vh"
        w="full"
        fontSize="xl"
        textColor="white"
        justify="space-evenly"
>
        <Flex justify = "space-around" w="20%" align="center"  >
        <Text><Link  to="/" mr={5}><LinkC>Root</LinkC></Link> </Text>
        <Text>|</Text>
        <Text><Link to="/home" ml={5}><LinkC>Home</LinkC></Link></Text>
        <Text>|</Text>
        <Text><Link to="/askquestion" ml={5}><LinkC>Ask a question</LinkC></Link></Text>
        </Flex>

        <Flex justify="space-around" w="20%" align="center">
        <InputGroup borderColor={"white"}>
          <InputLeftElement
            pointerEvents='none'
            children={<IconButton aria-label='Search' icon={<SearchIcon />} colorScheme="red.400" />}
          />
          <Input placeholder=' Search...' color='white.300' _placeholder={{ color: 'white' }} />
        </InputGroup>
        </Flex>
      </Flex>
      <Heading
            lineHeight={1.1}
            fontWeight={600}
            // fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
            <Text
              as={'span'}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '25%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}
              fontStyle={'italic'}>
              🅖Overflow
            </Text>
            {" "}
            <Text as={'span'} color={'red.400'} fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}>
              your QnA Forum!
            </Text>
            <br/><br/>
                </Heading>
            <Grid align="right"
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(15, 1fr)'
            gap={2}
            margin='8px'
            padding={8}
            shadow='md' borderWidth='2px' flex='1' borderRadius='lg'>
              <GridItem rowStart="1" colStart="16">
                <Image align="right" src={pplink} />
              </GridItem>
              <GridItem rowStart="2" colStart="16">
                <Heading as='h4' size='xs'>Name: {name}</Heading>
                <Heading as='h4' size='xs'>Email: {email}</Heading>
              </GridItem>
              <GridItem rowStart="3" colStart="15">
                <Login childToParent={childToParent}/>
              </GridItem>
              <GridItem rowStart="3" colStart="16">
                <Logout childToParent={childToParent}/>
              </GridItem>
            </Grid>
          <Outlet />
      
    </div>
  );
}

export default App ;
