import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({ className, ...props }) {
    return (
        <LabelPrimitive.Root
            data-slot='label'
            className={cn(
                'text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    )
}

export { Label }
