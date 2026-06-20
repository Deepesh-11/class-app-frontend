export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition"
    >
      {children}
    </button>
  );
}
