import { Text, Flex, Box, chakra, UnorderedList, ListItem, Image } from '@chakra-ui/react';

export const About = () => {
	return (
		<Box mt={['100vw', '5vw']} id="about">
			{/* Master Flex */}
			<Flex
				flexDirection={['column', 'column', 'row']}
				p={30}
				textAlign="left"
				justifyContent="center"
				alignItems="center">
				{/* Flex Item 1: About Text */}
				<Flex flexDirection="column" p={30} textAlign="left" justifyContent="center" alignItems="center">
					<Text fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="semibold" mr={240}>
						<chakra.span color="teal.100" fontFamily="heading">
							1.{' '}
						</chakra.span>
						About Me
					</Text>
					<Text fontSize={{ base: 'smaller', md: 'sm', lg: 'md' }} fontWeight="normal" maxWidth={450} pb={5}>
						As a seasoned Data Scientist with 2 years of experience, I know how to find the gems hidden in big and complex data sets. I turn those insights into smart decisions that make a difference for my clients.<br />
						I've got the skills to analyze data, use machine learning and scrape the web. No matter if I'm working with clients to uncover trends and opportunities or leading a team to create new solutions, I bring a unique blend of tech know-how and business savvy to every project.<br />
						I've got a solid grasp of the whole data science process, from gathering data to rolling out models, and that's why I always deliver results that really matter for businesses.<br /><br />
						Tools and Technologies:
					</Text>
					<Flex fontFamily="heading">
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>Python</ListItem>
							<ListItem>Plotly</ListItem>
							<ListItem>Scikit-learn</ListItem>
							<ListItem>Keras</ListItem>
							<ListItem>PyTorch</ListItem>
							<ListItem>Fast Api</ListItem>
							<ListItem>Flask</ListItem>
						</UnorderedList>
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>Scrapy</ListItem>
							<ListItem>Selenium</ListItem>
							<ListItem>Git</ListItem>
							<ListItem>SQL</ListItem>
							<ListItem>Tableau</ListItem>
							<ListItem>AWS & Azure</ListItem>
							<ListItem>Apache</ListItem>
						</UnorderedList>
					</Flex>
				</Flex>
				{/* Flex Item 2: Image */}
				<Flex flexDirection="column" p={30} textAlign="left" justifyContent="center" alignItems="center">
					<Box
						border={4}
						borderRadius={10}
						borderColor="teal.100"
						borderStyle="solid"
						// too hard to make it responsive
						display={['none', 'none', 'none', 'none', 'block']}
						zIndex={1}
						ml={50}
						mt={50}
						width={523}
						height={380}
						p={10}
						position="absolute"></Box>
					<Image src="/about.png" alt="Faisal Fida" width={573} height={380} />

				</Flex>
			</Flex>
		</Box>
	);
};
