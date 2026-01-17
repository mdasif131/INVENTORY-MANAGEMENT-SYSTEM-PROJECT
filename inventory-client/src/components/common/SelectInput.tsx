import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
interface IValu {
  value: string;
  item: string;
}
interface SelectInputProps {
  data: any[] ;
  placeholder?: string;
  value: any; // current selected value
  onValueChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  data,
  placeholder = 'Select per page',
  value ="5",
  onValueChange,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-50 ">
        <SelectValue>{placeholder}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(item => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
