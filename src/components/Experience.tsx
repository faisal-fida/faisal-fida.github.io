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
			title: 'Machine Learning',
			text: 'I utilize a combination of statistical modeling and real-world experimentation to build and fine-tune predictive models, delivering results that drive business impact.',
		},
		{
			id: 1,
			icon: <RiSoundModuleLine />,
			title: 'Web Scraping',
			text: 'I use a combination of cutting-edge technologies, best-in-class data analysis methods, and my experience to extract valuable insights from unstructured web data. My goal is to turn data into actionable information for my clients, enabling them to make informed decisions that drive their businesses forward.',
		},
		{
			id: 2,
			icon: <RiCodeSSlashLine />,
			title: 'Data Analysis',
			text: 'I approach data analysis with a combination of intuition, creativity, and a deep understanding of statistical techniques. From data exploration to hypothesis testing and model validation, I leverage my expertise in data visualization and programming to turn raw data into actionable insights that drive business impact.',
		},
		{
			id: 3,
			icon: <RiTerminalBoxLine />,
			title: 'Data Visualization',
			text: 'I excel at transforming complex data into meaningful insights through effective data visualization. Whether it is presenting findings to stakeholders, or exploring trends in real-time, my ability to craft compelling visual narratives ensures the story of the data is always front and center.',
		},
	];
	return (
		<Box mt={['100vw', '10vw']} id="experience">
			<Flex flexDirection="column" p={30} textAlign="center" justifyContent="center" alignItems="center">
				<Text fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="semibold" mb={5}>
					<chakra.span color="teal.100" fontFamily="heading">
						3.{' '}
					</chakra.span>
					Skills:
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
