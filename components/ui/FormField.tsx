'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const CONTROL_CLASSES =
  'w-full rounded-xl border bg-navy-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:outline-none focus-visible:outline-none';

const stateClasses = (hasError: boolean) =>
  hasError
    ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/25'
    : 'border-white/10 hover:border-white/20 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25';

interface SharedProps {
  label: string;
  /** Field id — also used to wire up the error message via `aria-describedby`. */
  id: string;
  error?: string | undefined;
  required?: boolean;
  className?: string;
}

export type TextFieldProps = SharedProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>;

/** Labelled text input with inline, screen-reader-announced validation errors. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, id, error, required, className, ...props },
  ref,
) {
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
        {required && (
          <span className="ml-1 text-brand-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        className={cn(CONTROL_CLASSES, stateClasses(Boolean(error)))}
        {...props}
      />

      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
});

export type TextAreaFieldProps = SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>;

/** Labelled textarea sharing the same styling and error contract as `TextField`. */
export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({ label, id, error, required, className, rows = 5, ...props }, ref) {
    const errorId = `${id}-error`;

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
          {required && (
            <span className="ml-1 text-brand-400" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          className={cn(CONTROL_CLASSES, stateClasses(Boolean(error)), 'resize-y')}
          {...props}
        />

        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  },
);

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
