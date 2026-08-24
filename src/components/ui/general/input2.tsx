import React from "react";
import { LucideIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  label?: string;
  type: string;
  name?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  error?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'highlight';

}

const InputField = ({
  icon: Icon,
  rightIcon: RightIcon,
  label,
  name,
  type,
  placeholder,
  className,
  required = false,
  value,
  onChange,
  onIconClick,
  error,
  variant = 'primary'
}: InputFieldProps) => {
  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };

  const variants = {
    primary: 'focus:ring-primary-500/20 focus:border-primary-500/50',
    secondary: 'focus:ring-secondary-500/20 focus:border-secondary-500/50',
    accent: 'focus:ring-accent-500/20 focus:border-accent-500/50',
    highlight: 'focus:ring-highlight-500/20 focus:border-highlight-500/50'
  };

  return (
    <div className="space-y-1">
      {label && <Label> {label}</Label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={cn(
            "h-5 w-5",
            {
              'text-primary-400': variant === 'primary',
              'text-secondary-400': variant === 'secondary',
              'text-accent-400': variant === 'accent',
              'text-highlight-400': variant === 'highlight',
            }
          )} />
          </div>
        )}

        <input
        required={required}
          type={type}
          className={cn(
            "block w-full pl-10 pr-3 py-2.5",
            "bg-white/5 border border-primary rounded-lg",
            "text-black placeholder-gray-400",
            "focus:ring-2 transition-colors",
            variants[variant], className,
            error && 'border-accent-500/50',
            `${ Icon ? "pl-10" : "pl-2" }`
          )}
         
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {RightIcon && (
          <div
            onClick={handleIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          >
             <RightIcon className={cn(
            "h-5 w-5",
            {
              'text-primary-400': variant === 'primary',
              'text-secondary-400': variant === 'secondary',
              'text-accent-400': variant === 'accent',
              'text-highlight-400': variant === 'highlight',
            }
          )} />
            {/* <RightIcon className="h-5 w-5 text-gray-400" /> */}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default InputField;
