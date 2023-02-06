import { Text, Flex, Box, chakra, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Hero = () => {
	return (
		<Box height={['60vh', '90vh']} id="hero">
			<Flex
				flexDirection="column"
				p={30}
				pt={125}
				textAlign="left"
				justifyContent="center"
				alignItems="center"
				ml={[-1, '-12vh', '-22vh']}>
				<Box flex={1}>
					<Text
						fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
						fontFamily="heading"
						color="teal.100"
						pb={5}
						ml={10}
						className="fade delay6">
						Hi 👋, my name is
					</Text>
					<Box
						borderLeft={1}
						borderLeftWidth={20}
						borderColor="teal.100"
						borderStyle="solid"
						className="fade delay7">
						<Text
							fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
							fontWeight="black"
							lineHeight="125%"
							mx={5}>
							Faisal Fida
							<br />
							<chakra.span color="gray.100">Unleashing insights, driving decisions: A Data Scientist's journey.</chakra.span>
						</Text>
					</Box>
					{/* <Text
						fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
						ml={10}
						my={['25px', '30px', '45px']}
						maxWidth={['sm', 'md', 'lg']}
						className="fade delay8">
						Innovative and creative projects, utilizing all facets of technology.
					</Text> */}
					<NextLink href="#contact" passHref>
						<Button
							zIndex={1}
							overflow="hidden"
							mt={['1px', '20px', '25px']}
							ml={10}
							variant="outline"
							width={200}
							height={50}
							_hover={{
								backgroundColor: 'rgba(86, 187, 187, 0.2)',
								textDecoration: 'none',
							}}
							className="fade delay9">
							Contact Me
						</Button>
					</NextLink>
				</Box>
			</Flex>
		</Box>
	);
};
