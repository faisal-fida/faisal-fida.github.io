import { Text, Flex, Box, chakra } from '@chakra-ui/react';
import { Project } from './Project';

export const Work = () => {
	return (
		<Box mt={['50vw', '20vw']} id="work">
			<Flex flexDirection="column" textAlign="center" justifyContent="center" alignItems="center">
				<Text fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} mb={-50} fontWeight="semibold">
					<chakra.span color="teal.100" fontFamily="heading">
						2.{' '}
					</chakra.span>
					What I Do:
				</Text>
			</Flex>
			<Project
				id={0}
				title="PakWheels Data Scraper and Analysis"
				description="Developed a data scraping system that extracted relevant information from the PakWheels website, including data on used and new cars and bikes. Conducted extensive data analysis to identify trends and patterns in the PakWheels market, and presented the findings. Utilized machine learning techniques to further analyze the data, and provided insights and recommendations to the client on how to optimize their operations and increase their success."
				imagePath="/projects/hgcb.png"
				tech={['Python', 'Tableau', 'BeautifulSoup']}
				github="https://github.com/faisal-fida/pak-wheels-analysis"
				url=""
			/>
			<Project
				id={1}
				title="Craft"
				description="A website for a fake programming language that I came up with. It doesn't exist. I designed the UI in in Figma and brought it to the web using TailwindCSS."
				imagePath="/projects/craft.jpg"
				tech={['HTML', 'Tailwind CSS', 'Node.js']}
				github="https://github.com/faisal-fida/craft"
				url=""
				inverse={true}
			/>
			<Project
				id={2}
				title="Struct"
				description="My IaC (Infrasructure as Code) project. This is my Ansible playbook that I use to automatically provision settings and applications on my Raspberry Pi 4 using Ubuntu Server 20.04. This keeps it idempotent and reproducible if anything goes wrong (Murphy's Law)."
				imagePath="/projects/struct.png"
				tech={['Ansible', 'Docker', 'YAML']}
				github="https://github.com/faisal-fida/struct"
				url=""
			/>
			<Project
				id={3}
				title="Lil Donut"
				description="A digital media assessment focused around huge doughnuts, made using plain HTML/CSS/JS in August 2020."
				imagePath="/projects/lildonut.png"
				tech={['HTML', 'CSS', 'JavaScript']}
				github="https://github.com/faisal-fida/lildonut"
				url=""
				inverse={true}
			/>
		</Box>
	);
};
