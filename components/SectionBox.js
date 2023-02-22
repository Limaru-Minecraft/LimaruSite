export default function SectionBox({ children }) {
    return (
        <div className="flex flex-col gap-y-4 mb-8">
            {children}
        </div>
    );
}