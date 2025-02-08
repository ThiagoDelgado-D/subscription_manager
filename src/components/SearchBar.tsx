import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder="Search channels..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-2"
      />
    </div>
  );
};