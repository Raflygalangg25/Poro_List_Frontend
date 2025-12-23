"use client";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  taskTitle: string;
  taskDescription: string;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  confirmButtonText?: string;
  isReadOnly?: boolean;
  taskCompleted?: boolean;
}

export default function TaskModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  taskTitle,
  taskDescription,
  onTitleChange,
  onDescriptionChange,
  confirmButtonText = "Save",
  isReadOnly = false,
  taskCompleted,
}: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-[#113F67]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] p-5 sm:p-6 md:p-8 max-w-[90vw] sm:max-w-[500px] w-full shadow-2xl mx-auto">
        {/* Form Fields */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
          {/* Task Title Input/Display */}
          <div>
            {isReadOnly ? (
              <div className="bg-[#34699A] rounded-[15px] px-3 sm:px-4 py-3 sm:py-4">
                <div className="text-white/70 font-[family-name:var(--font-quicksand)] text-[10px] sm:text-[11px] font-semibold mb-1 uppercase tracking-wide">
                  Task Title
                </div>
                <p className="text-white font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[15px] md:text-[16px] font-bold break-words">
                  {taskTitle || "No title"}
                </p>
              </div>
            ) : (
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => onTitleChange?.(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] bg-[#34699A] text-white placeholder-white/70 font-[family-name:var(--font-quicksand)] text-[13px] sm:text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Task Title"
                maxLength={50}
              />
            )}
          </div>

          {/* Description Textarea/Display */}
          <div className="relative">
            {isReadOnly ? (
              <div className="bg-[#34699A] rounded-[15px] px-3 sm:px-4 py-3 sm:py-4">
                <div className="text-white/70 font-[family-name:var(--font-quicksand)] text-[10px] sm:text-[11px] font-semibold mb-1 uppercase tracking-wide">
                  Description
                </div>
                <p className="text-white font-[family-name:var(--font-quicksand)] text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                  {taskDescription || "No description"}
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={taskDescription}
                  onChange={(e) => onDescriptionChange?.(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-[15px] bg-[#34699A] text-white placeholder-white/70 font-[family-name:var(--font-quicksand)] text-[13px] sm:text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-white/50 h-32 sm:h-36 md:h-40 resize-none"
                  placeholder="Short Description"
                  maxLength={200}
                />
                <div className="text-white/60 text-[11px] sm:text-[12px] mt-1 text-right font-[family-name:var(--font-quicksand)]">
                  {taskDescription.length}/200 characters
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={isReadOnly ? onClose : onConfirm}
            className="bg-white hover:bg-gray-100 text-[#34699A] font-[family-name:var(--font-quicksand)] text-[15px] sm:text-[16px] md:text-[18px] font-bold px-12 sm:px-16 md:px-20 py-2.5 sm:py-3 rounded-[20px] transition-colors"
          >
            {isReadOnly ? "Close" : confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
