import { Box, Heading, Text, HStack , Grid, GridItem,IconButton, useToast} from "@chakra-ui/react"
import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {DeleteIcon} from '@chakra-ui/icons'
import {BiEdit, BiShareAlt, BiClipboard} from "react-icons/bi"
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from "react-share";

export default function Questionwrapper({question, email, deleter }) {
    
    const date = new Date(question.createdAt)
    const toast = useToast()

    function toMins(m) {
        if(m < 10)
            return '0'+m.toString();
        return m.toString();
    }

    // console.log(date)
    return(
        <HStack  flexDirection='row' p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='lg' >
            <Box w='15%' borderWidth='3px' borderRadius='md'>
                <Box color='#6a73a6'>{question.upvotes} votes{/*{<ArrowUpIcon color='white.300' align='center' w={5} h={5}/>}*/}</Box>
                <Box bg='#5eba7d' color='#ffffea' borderRadius='md'>{question.answers.length} answers</Box>
            </Box>
            <Box w='100%' align='left'>
                <Link
                    to = {`/question/${question._id}`}
                    state = {{question: {question}}}
                    size= '10px'
                ><Heading as='h4' size='m' color='#0a95ff'>Q: {question.title}</Heading></Link>
                <Box><Text>{question.body}</Text></Box>
                <Grid display="flex">
                    Tags:
                    {question.tags.map(tag => <GridItem margin="3px" display="flex" borderRadius="5px" borderWidth="2px" w={(tag.length*2).toString()+"%"}>{tag}</GridItem>)}
                </Grid>
            </Box>
            <br/><br/><br/><br/>
            <Box>Posted at {date.getHours()}:{toMins(date.getMinutes())} on {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()} by {question.postedBy.fullName} ( <a href={`mailto:${question.postedBy.email}`}>{question.postedBy.email}</a> )</Box> 
            <Grid templateColumns='repeat(3, 1fr)'>
                                {(email == question.postedBy.email) ? <GridItem colStart={2}  ><IconButton w='8' icon={<BiEdit/>}  /></GridItem> : <></>}
                                {(email == question.postedBy.email) ? <GridItem colStart={3} margin ="1px"><IconButton w='8' icon={<DeleteIcon/>} onClick = {() => deleter(question._id)}/></GridItem> : <></>}
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
                                            quote={"I'd appreciate it if you guys could help me out with this question. Thanks!"}>
                                            <FacebookIcon size={36} />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={`http://g-overflow.netlify.app/question/${question._id}`}>
                                            <WhatsappIcon size={36}/>
                                        </WhatsappShareButton>
                                        </GridItem>
                                </PopoverContent>
                                </Popover>
                            </Grid>
        </HStack>
        
    )
}