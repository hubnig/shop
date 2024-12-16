'use client'

import {
	Button,
	Container,
	Group,
	Image,
	List,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import Link from 'next/link'
import classes from './Hero.module.css'

const HeroBullets = () => {
	return (
		<Container size='md'>
			<div className={classes.inner}>
				<div className={classes.content}>
					<Title className={classes.title}>
						A <span className={classes.highlight}>modern</span> React <br />
						components library
					</Title>
					<Text
						c='dimmed'
						mt='md'
						variant='gradient'
						gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
					>
						Build fully functional accessible web applications faster than ever
						– Mantine includes more than 120 customizable components and hooks
						to cover you in any situation
					</Text>

					<List
					className={classes.list}
						mt={30}
						spacing='sm'
						size='sm'
						icon={
							<ThemeIcon size={20} radius='xl'>
								<IconCheck
									style={{ width: rem(12), height: rem(12) }}
									stroke={1.5}
								/>
							</ThemeIcon>
						}
					>
						<List.Item>
							<b>TypeScript based</b> – build type safe applications, all
							components and hooks export types
						</List.Item>
						<List.Item>
							<b>Free and open source</b> – all packages have MIT license, you
							can use Mantine in any project
						</List.Item>
						<List.Item>
							<b>No annoying focus ring</b> – focus ring will appear only when
							user navigates with keyboard
						</List.Item>
					</List>

					<Group mt={30}>
						<Link href='/products'>
							<Button radius='xl' size='md' className={classes.control}>
								Get started
							</Button>
						</Link>
						<Button
							variant='default'
							radius='xl'
							size='md'
							className={classes.control}
						>
							Source code
						</Button>
					</Group>
				</div>
				<Image
					className={classes.image}
					src='https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg'
					alt='Mantine logo'
				/>
			</div>
		</Container>
	)
}

export default HeroBullets
