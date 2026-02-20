import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion'
import { CSSProperties } from 'react'
import LogoPng from '@/assets/image/logo.png'
import LogoDarkPng from '@/assets/image/win-tray-icon-blue.png'
import { useSetting } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import { useExperimentalThemeContext, ThemeMode } from '@/components/providers/theme-provider'
import styles from './animated-logo.module.scss'

const Logo = motion.img

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
      scale: [1, 1.15, 1],
      y: [0, -15, 0],
      filter: [
        'drop-shadow(0 0 5px var(--cyber-primary, #eb00ff))',
        'drop-shadow(0 0 20px var(--cyber-primary, #eb00ff))',
        'drop-shadow(0 0 5px var(--cyber-primary, #eb00ff))',
      ],
      rotate: [0, 10, -10, 0],
      transition: {
        opacity: { duration: 0.5 },
        scale: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        },
        filter: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
        rotate: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        },
      },
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
  const { themeMode } = useExperimentalThemeContext()

  const disable = disableMotion ?? value
  const isDark = themeMode === ThemeMode.DARK

  return (
    <AnimatePresence initial={false}>
      <Logo
        src={isDark ? LogoDarkPng : LogoPng}
        alt="Logo"
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
