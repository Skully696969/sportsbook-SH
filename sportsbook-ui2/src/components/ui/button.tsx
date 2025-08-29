import * as React from 'react'
import { cn } from './utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant='solid', size='md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition-colors'
    const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-5 text-base' }[size]
    const variants = {
      solid: 'bg-emerald-600 hover:bg-emerald-500 text-neutral-50',
      outline: 'border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-100',
      ghost: 'text-neutral-200 hover:bg-neutral-800/60',
    }[variant]
    return <button ref={ref} className={cn(base, sizes, variants, className)} {...props} />
  }
)
Button.displayName = 'Button'
