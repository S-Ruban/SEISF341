import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Text, Grid, GridItem,Input, InputGroup, IconButton} from "@chakra-ui/react"
import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton, toast} from '@chakra-ui/react'
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from "react-share";
import {DeleteIcon, CheckIcon} from '@chakra-ui/icons'
import {BiUpvote, BiDownvote, BiSend, BiShareAlt, BiClipboard, BiEdit} from "react-icons/bi"
import {FcCheckmark} from "react-icons/fc"
import {MdOutlineReportProblem} from "react-icons/md"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Question = ({ email }) => {
    const {id} = useParams()
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState('')
    const [aId,appAnswer] = useState('')
    
    function toMins(m) {
        if(m < 10)
            return '0'+m.toString();
        return m.toString();
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/q/${id}`)
        .then(res=>{
            console.log(res);
            setQuestion(res.data);
            console.log(question)
        })
        .catch(err=>{
            console.error(err);
        })
    },[])

    const up = () => {
        console.log("up");
        
        axios({method: 'put', url: `http://localhost:5000/upvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const down = () => {
        console.log("down");

        axios({method: 'put', url: `http://localhost:5000/downvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const upAns = (ans) => {
        console.log("upAns");
        
        axios({method: 'put', url: `http://localhost:5000/upvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const downAns = (ans) => {
        console.log("downAns");

        axios({method: 'put', url: `http://localhost:5000/downvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const postAnswer = () => {
        const ans = { body: answer }

        axios.post(`http://localhost:5000/answer/${id}`, ans, { headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        } }).then(res => {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })

        setAnswer('')
    }

    const deleteAnswer = (ans) => {
        axios({method: 'delete', url: `http://localhost:5000/q/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const approveAnswer = (ans) => {
        // console.log(ans);
        // console.log(id);
        axios({method: 'put', url: `http://localhost:5000/approve/${id}/${ans}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            answer: ans
        }})
        .then(res=> {
            console.log("Approve answer");
            appAnswer(ans);
        })
        .catch(err=>{
            console.error(err);
        })
    }



    return ( 
        <div
        >

            { question && (
                
                <Grid
                bg='white' 
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
                margin='8px'
                padding={8}
                shadow='md' borderWidth='2px' flex='1' borderRadius='lg'
                >
                <GridItem rowSpan={1} colSpan={1} h='20'>
                    <Grid templateColumns='repeat(5, 1fr)' gap={4} >
                    <GridItem colStart={1} colEnd={1} h='20'>
                        <IconButton h='8' icon={<BiUpvote/>} colorScheme="green" onClick={up}/>
                        <br/>
                        <IconButton h='8' icon={<BiDownvote/>} colorScheme="red" onClick={down}/>
                        <Popover>
                                <PopoverTrigger>
                                    <IconButton icon={<BiShareAlt/>}>Trigger</IconButton>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Link to={`/question/${question._id}`}>{`http://localhost:3000/question/${question._id}`}</Link>
                                        </PopoverBody>
                                    <GridItem templateColumns='repeat(3, 1fr)'>
                                    <IconButton icon={<BiClipboard/>}  onClick={() => {
                                        navigator.clipboard.writeText(`http://localhost:3000/question/${question._id}`);
                                        toast({
                                            title: 'Copied link to clipboard',
                                            duration: 1000,
                                            status: 'success',
                                            isClosable: true,
                                          })}
                                        }/>
                                        <FacebookShareButton 
                                            url={`http://g-overflow.netlify.app/question/${question._id}`}
                                            quote={"Check out this post!"}>
                                            <FacebookIcon size={36} />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={`http://g-overflow.netlify.app/question/${question._id}`}>
                                            <WhatsappIcon size={36}/>
                                        </WhatsappShareButton>
                                        </GridItem>
                                </PopoverContent>
                                </Popover>
                    </GridItem>
                    <GridItem colStart={2} colEnd={2} h='10' >
                        <Box h='10' w = '40' borderWidth='5px' bg = "papayawhip" borderColor='papayawhip' borderRadius={'sm'}>{question.upvotes} votes</Box>
                        <Box bg='#5eba7d' color='#ffffea' h='10'  w = '40' borderWidth='5px' borderColor='#5eba7d' borderRadius={'sm'}>{question.answers.length} answers</Box>
                    </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colStart={2} colEnd={4} bg='papayawhip' borderWidth='2px' borderRadius='5' padding={2}  >
                    <Heading as='h2' size='lg' align='left'>{question.title} </Heading>
                </GridItem>
                <GridItem colSpan={1} bg='white' shadow='sm' borderWidth='2px' flex='1' borderRadius='sm'  padding={2}>
                <Box>Asked,  {new Date(question.createdAt).toLocaleString('default', { month: 'long' })} {new Date(question.createdAt).getDate()}, {new Date(question.createdAt).getFullYear()} at {new Date(question.createdAt).getHours()}:{toMins(new Date(question.createdAt).getMinutes())} by {question.postedBy.fullName} ( <a href={`mailto:${question.postedBy.email}`}>{question.postedBy.email}</a> )</Box>
                </GridItem>

                {/* Question Body */}
                <GridItem colSpan={5} bg='yellow.100' borderWidth='2px' borderRadius='5' padding={2}>
                    <Text align="left">{question.body}</Text>
                </GridItem>

            <GridItem display="flex">
            {question.tags.map(tag => <GridItem margin="3px" display="flex" borderRadius="5px" bgColor={"gray.200"} borderWidth="2px" w={(tag.length*3).toString()+"%"}>{tag}</GridItem>)}
            </GridItem>

            {/* Answer a Question */}
            <GridItem colSpan={3} bg='' borderWidth='3px' borderRadius='15' padding={2}>
            <InputGroup  >
            <IconButton aria-label='Answer' textColor={"gray"} icon={<BiSend />} color="yellow.1000" onClick={postAnswer} />
                <Input placeholder=' Answer...' color='white.300' 
                _placeholder={{ color: 'black' }} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                </InputGroup>
            </GridItem>
                
                {/* Answers */}
                <GridItem colSpan={5} borderColor='#a2bdf2' borderWidth='5px'>
                        
                        {question.answers.map(answer => (
                            <GridItem margin='8px' 
                            padding={8}
                            shadow='md' borderWidth='2px' flex='1' borderRadius='lg'>
                                <Grid templateColumns='repeat(4, 1fr)'>
                                    {(answer.approved === true || aId === answer._id) && <GridItem colStart={1} marginLeft="0px" ><CheckIcon boxSize={5} color="green"/></GridItem>}
                                    {(email == question.postedBy.email) ? <GridItem colStart={2}  ><IconButton w='8' icon={<FcCheckmark/>} onClick = {() => approveAnswer(answer._id)} /></GridItem> : null}
                                    {(email == answer.postedBy.email) ? <GridItem colStart={3}  ><IconButton w='8' icon={<BiEdit/>}  /></GridItem> : null}
                                    {(email == answer.postedBy.email) ? <GridItem colStart={4} ><IconButton w='8' icon={<DeleteIcon/>} onClick = {() => deleteAnswer(answer._id)} /></GridItem> : null}
                                    <GridItem colStart={4} ><IconButton w='8' icon={<MdOutlineReportProblem/>} /></GridItem>
                                    
                                </Grid>
                                <Text align="left">{answer.body}</Text>
                                
                                <Grid templateColumns='repeat(3, 1fr)'>
                                    <GridItem colStart={2}><Text align="right" fontSize="3xl">{answer.upvotes}</Text></GridItem>
                                    <GridItem colStart={2} marginLeft="650px"><IconButton w='8' icon={<BiUpvote/>} colorScheme="green" onClick={() => upAns(answer._id)}/></GridItem>
                                    <GridItem colStart={3}><IconButton w='8' icon={<BiDownvote/>} colorScheme="red" onClick={() => downAns(answer._id)}/></GridItem>
                                    <GridItem colStart={4}>
                                    <Popover>
                                <PopoverTrigger>
                                    <IconButton icon={<BiShareAlt/>}>Trigger</IconButton>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Link to={`/question/${question._id}`}>{`http://localhost:3000/question/${answer._id}`}</Link>
                                        </PopoverBody>
                                    <GridItem templateColumns='repeat(3, 1fr)'>
                                    <IconButton icon={<BiClipboard/>}  onClick={() => {
                                        navigator.clipboard.writeText(`http://localhost:3000/question/${answer._id}`);
                                        toast({
                                            title: 'Copied link to clipboard',
                                            duration: 1000,
                                            status: 'success',
                                            isClosable: true,
                                          })}
                                        }/>
                                        <FacebookShareButton 
                                            url={`http://g-overflow.netlify.app/question/${answer._id}`}
                                            quote={"What do you think of my answer to this question?"}>
                                            <FacebookIcon size={36} />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={`http://g-overflow.netlify.app/question/${answer._id}`}>
                                            <WhatsappIcon size={36}/>
                                        </WhatsappShareButton>
                                        </GridItem>
                                </PopoverContent>
                                </Popover>
                                </GridItem>
                                </Grid>
                                {/* <br/> */}
                                <Text align="right"> - by {answer.postedBy.fullName} ( <a href={`mailto:${answer.postedBy.email}`}>{answer.postedBy.email}</a> ) at
                                {" " + new Date(answer.createdAt).getHours()}:{toMins(new Date(answer.createdAt).getMinutes()) + " on "} 
                                {new Date(answer.createdAt).toLocaleString('default', { month: 'long' }) + " "} 
                                {new Date(answer.createdAt).getDate() + ", "} 
                                {new Date(answer.createdAt).getFullYear()}</Text>
                            </GridItem>
                        ))}
                    </GridItem>
            </Grid>
            )}
            
        </div>
     );
}
 
export default Question;