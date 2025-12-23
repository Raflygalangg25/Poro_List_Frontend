"use client";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
  onClick?: () => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onClick,
}: TaskCardProps) {
  return (
    <div className="bg-[#226B9C] rounded-[25px] sm:rounded-[35px] p-0 flex items-stretch overflow-hidden min-h-[110px] sm:min-h-[125px] md:min-h-[139px] max-w-[969px]">
      {/* Delete Icon with White Background */}
      <button
        onClick={onDelete}
        className="w-[60px] sm:w-[80px] md:w-[100px] bg-white flex items-center justify-center flex-shrink-0 hover:bg-gray-100 transition-colors"
        aria-label="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#226B9C"
          className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
        >
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
        </svg>
      </button>

      {/* Task Content */}
      <div
        className="flex-1 min-w-0 p-2 sm:p-3 md:p-5 flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-[#1d5a82] transition-colors"
        onClick={onClick}
      >
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-start gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
            {/* Title - Responsive */}
            <h3 className="text-white font-[family-name:var(--font-baloo-da)] text-[18px] sm:text-[24px] md:text-[28px] font-bold uppercase leading-tight break-words">
              {task.title}
            </h3>
            {!task.completed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="flex-shrink-0 mt-0.5"
                aria-label="Edit task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="white"
                  className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
                >
                  <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
                </svg>
              </button>
            )}
          </div>
          {/* Description - Responsive */}
          <p className="text-white font-[family-name:var(--font-comfortaa)] text-[12px] sm:text-[15px] md:text-[18px] font-light leading-snug line-clamp-2 break-words">
            {task.description}
          </p>
        </div>

        {/* Action Button - Responsive */}
        {!task.completed ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="bg-white hover:bg-gray-100 text-[#34699A] font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[17px] md:text-[20px] font-bold px-3 sm:px-5 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-[12px] sm:rounded-[18px] md:rounded-[20px] transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Done
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="bg-white hover:bg-gray-100 text-[#34699A] font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[17px] md:text-[20px] font-bold w-[44px] sm:w-[52px] md:w-[60px] h-[44px] sm:h-[52px] md:h-[60px] rounded-[12px] sm:rounded-[18px] md:rounded-[20px] transition-colors flex-shrink-0 flex items-center justify-center p-0"
            aria-label="Return to ongoing"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="sm:w-5 sm:h-5 md:w-7 md:h-7"
            >
              <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
