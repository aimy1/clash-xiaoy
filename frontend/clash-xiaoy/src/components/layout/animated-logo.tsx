import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion'
import { CSSProperties } from 'react'
<<<<<<< HEAD
import LogoPng from '@/assets/image/logo.png'
import LogoDarkPng from '@/assets/image/win-tray-icon-blue.png'
import { useSetting } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import { useExperimentalThemeContext, ThemeMode } from '@/components/providers/theme-provider'
import styles from './animated-logo.module.scss'

const Logo = motion.img
=======
import LogoSvg from '@/assets/image/logo.svg?react'
import { useSetting } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import styles from './animated-logo.module.scss'

const Logo = motion.create(LogoSvg)
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1

const transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
} satisfies Transition

const motionVariants: { [name: string]: Variants } = {
  default: {
    initial: {
      opacity: 0,
      scale: 0.5,
      transition,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition,
    },
    whileHover: {
      scale: 1.1,
      rotate: 360,
      filter: 'drop-shadow(0 0 15px var(--cyber-primary))',
      transition: { duration: 0.8, type: 'spring' },
    },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
}

export default function AnimatedLogo({
  className,
  style,
  disableMotion,
}: {
  className?: string
  style?: CSSProperties
  disableMotion?: boolean
}) {
  const { value } = useSetting('lighten_animation_effects')
<<<<<<< HEAD
  const { themeMode } = useExperimentalThemeContext()

  const disable = disableMotion ?? value
  const isDark = themeMode === ThemeMode.DARK
=======

  const disable = disableMotion ?? value
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1

  return (
    <AnimatePresence initial={false}>
      <Logo
<<<<<<< HEAD
        src={isDark ? LogoDarkPng : LogoPng}
        alt="Logo"
=======
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
        className={cn(styles.LogoSchema, className)}
        variants={motionVariants[disable ? 'none' : 'default']}
        style={style}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        whileDrag={{ scale: 1.15 }}
        dragSnapToOrigin
        dragElastic={0.1}
      />
    </AnimatePresence>
  )
}
