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
						<br />
						🌱 I'm  Data Science and ML Student passionate about AI Tech, I started my journey back in 2019 by learning and growing my skillset in maching learning, Deep Learning, NLP, data structures and algorithms.

						<br />
						<br />
						Fast-forward to today:
						<br />
						<br />
						Transforming data into insights with 1+ year of demonstrated experience in data analytics and machine learning.
						<br />
						Identify and translate business requirement with analytical and visualizational skill.
						<br />
						Deriving insights and creating a story for business to make million-dollar decisions.
						<br />
						<br />
						Tools and Technologies:
					</Text>
					<Flex fontFamily="heading">
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>Plotly</ListItem>
							<ListItem>Tensorflow</ListItem>
							<ListItem>Sk-Learn</ListItem>
						</UnorderedList>
						<UnorderedList mx={[50, 75, 100]}>
							<ListItem>SQL</ListItem>
							<ListItem>BI Tools</ListItem>
							<ListItem>Tableau</ListItem>
						</UnorderedList>
					</Flex>
				</Flex>
				{/* Flex Item 2: Image */}
				<Flex flexDirection="column" p={30} textAlign="left" justifyContent="center" alignItems="center">
					<Box
						border={3}
						borderRadius={8}
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
					<Image src="/about.png" alt="Faisal Fida" width={500} height={400} />

				</Flex>
			</Flex>
		</Box>
	);
};
