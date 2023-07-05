import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

function RefreshButton({
  onRefresh: handleRestart,
  className = "",
}: {
  onRefresh: () => void;
  className?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    btnRef.current?.blur();
    handleRestart();
  }

  return (
    <button ref={btnRef} onClick={handleClick} className={`${className}`}>
      <MdRefresh className="refresh-icon" />
    </button>
  );
}

export default RefreshButton;
