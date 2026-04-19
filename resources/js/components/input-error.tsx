import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/lib/error-messages';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    const formattedMessage = message ? getErrorMessage(message) : '';
    
    return formattedMessage ? (
        <p
            {...props}
            className={cn('text-sm text-red-600 dark:text-red-400', className)}
        >
            {formattedMessage}
        </p>
    ) : null;
}
