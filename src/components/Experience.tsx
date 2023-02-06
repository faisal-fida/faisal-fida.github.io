import { Text, Flex, Box, chakra, Container, SimpleGrid, HStack, VStack } from '@chakra-ui/react';
import {
	RiVideoAddLine,
	RiTerminalBoxLine,
	RiCodeSSlashLine,
	RiSoundModuleLine,
} from 'react-icons/ri';

export const Experience = () => {
	const skills = [
		{
			id: 0,
			icon: <RiVideoAddLine />,
			title: 'Lightning fast',
			text: 'I scope requests to ensure that development is completed as quickly as possible.',
		},
		{
			id: 1,
			icon: <RiSoundModuleLine />,
			title: 'Tech Crew',
			text: 'I work with my fellow developers and state-of-the-art technologies to help scale quickly.',
		},
		{
			id: 2,
			icon: <RiCodeSSlashLine />,
			title: 'Top-notch quality',
			text: 'The code I write is always of the highest quality and well-reviewed.',
		},
		{
			id: 3,
			icon: <RiTerminalBoxLine />,
			title: 'DevOps',
			text: 'I test and deploy applications and custom services to AWS servers by using tools like GitHub and Docker.',
		},
	];
	return (
		<Box mt={['100vw', '10vw']} id="experience">
			<Flex flexDirection="column" p={30} textAlign="center" justifyContent="center" alignItems="center">
				<Text fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="semibold" mb={5}>
					<chakra.span color="teal.100" fontFamily="heading">
						3.{' '}
					</chakra.span>
					How I Do:
				</Text>
				<Text fontSize={{ base: 'sm', md: 'md', lg: 'xl' }} fontFamily="heading" color="teal.100" pb={5}>

				</Text>
				<Container maxW={'6xl'} mt={10} textAlign="left">
					<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
						{skills.map((feature) => (
							<HStack key={feature.id} align={'top'}>
								<Box color={'teal.100'} px={2} mt={1}>
									{feature.icon}
								</Box>
								<VStack align={'start'}>
									<Text fontWeight={600} fontSize="md">
										{feature.title}
									</Text>
									<Text>{feature.text}</Text>
								</VStack>
							</HStack>
						))}
					</SimpleGrid>
				</Container>
			</Flex>
		</Box>
	);
};
