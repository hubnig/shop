'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout } from '@/store/user/user.actions'
import {
	Avatar,
	Box,
	Burger,
	Button,
	Divider,
	Drawer,
	Group,
	ScrollArea,
	rem
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import { BookHeart } from 'lucide-react'
import Link from 'next/link'
import classes from './Header.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false)
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.user)

	return (
		<Box pb={120}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<Link href="/">
						<MantineLogo size={30} />
					</Link>

					<Group h="100%" gap={0} visibleFrom="sm">
						<a href="#" className={classes.link}>
							Home
						</a>
						<a href="#" className={classes.link}>
							Learn
						</a>
						<a href="#" className={classes.link}>
							Academy
						</a>
					</Group>

					{user ? (
						<Group>
							<Link href="/wishlist">
								<Button variant="default">
									<BookHeart />
								</Button>
							</Link>
							<Button variant="default" onClick={() => dispatch(logout())}>
								LogOut
							</Button>
							<Avatar color="initial" src={user.avatar} alt="avatar" />
							<ThemeToggle />
						</Group>
					) : (
						<Group visibleFrom="sm">
							<Link href="/auth?mode=login">
								<Button variant="default">Log in</Button>
							</Link>
							<Link href="/auth?mode=register">
								<Button>Sign up</Button>
							</Link>
							<ThemeToggle />
						</Group>
					)}

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						hiddenFrom="sm"
					/>
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<a href="#" className={classes.link}>
						Home
					</a>
					<a href="#" className={classes.link}>
						Learn
					</a>
					<a href="#" className={classes.link}>
						Academy
					</a>
					<Divider my="sm" />
					<Group justify="center" grow pb="xl" px="md">
						<Link href="/auth/login">
							<Button variant="default">Log in</Button>
						</Link>
						<Link href="/auth/register">
							<Button>Sign up</Button>
						</Link>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	)
}
