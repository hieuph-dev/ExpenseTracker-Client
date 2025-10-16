import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export function Tabs({ className, ...props }) {
    return (
        <TabsPrimitive.Root
            data-slot='tabs'
            className={cn('w-full', className)}
            {...props}
        />
    )
}

export function TabsList({ className, ...props }) {
    return (
        <TabsPrimitive.List
            data-slot='tabs-list'
            className={cn(
                'inline-flex h-12 items-center justify-center rounded border-2 border-black bg-purple-100 p-1 text-foreground',
                className
            )}
            {...props}
        />
    )
}

export function TabsTrigger({ className, ...props }) {
    return (
        <TabsPrimitive.Trigger
            data-slot='tabs-trigger'
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded border-2 border-transparent px-2 py-1 gap-1.5 text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-300 data-[state=active]:text-main-foreground data-[state=active]:border data-[state=active]:border-2 data-[state=active]:border-black',
                className
            )}
            {...props}
        />
    )
}

export function TabsContent({ className, ...props }) {
    return (
        <TabsPrimitive.Content
            data-slot='tabs-content'
            className={cn(
                'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                className
            )}
            {...props}
        />
    )
}
