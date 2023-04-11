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
						<br />Hey! I have worked on a range of projects including lead generation, financial analysis, customer behavior analysis, and fraud detection. <br /><br />
						My experience in these areas allows me to develop innovative solutions to complex problems, leveraging data and machine learning to drive business value.
						My strong technical skills, coupled with my ability to work collaboratively with cross-functional teams, make me a valuable asset to any organization looking to leverage data to drive business growth.<br /><br />
						Here are a few technologies I've been working with recently:
					</Text>
					<Flex fontFamily="heading">
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>Keras</ListItem>
							<ListItem>FastApi</ListItem>
							<ListItem>Flask</ListItem>
							<ListItem>SQL & Git</ListItem>
						</UnorderedList>
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>Scrapy</ListItem>
							<ListItem>Selenium</ListItem>
							<ListItem>Docker</ListItem>
							<ListItem>AWS & Azure</ListItem>

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
					<Image src="https://xmdb.dev/about.png" alt="Faisal Fida" width={573} height={380} />

				</Flex>
			</Flex>
		</Box>
	);
};
