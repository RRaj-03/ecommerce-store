import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";

const IconButton = ({
  icon,
  onClick,
  className,
}: {
  icon: React.ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
