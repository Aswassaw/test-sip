import { Checkbox, Label } from "flowbite-react";
import { Fragment } from "react";

interface InputCheckboxInterface {
  description: string;
  mandatory: number;
}

export default function InputCheckbox(props: InputCheckboxInterface) {
  return (
    <Fragment>
      <div className="flex items-center gap-2 mb-6">
        <Checkbox />
        <Label>
          {props.description}{" "}
          {props.mandatory === 1 && <span className="text-red-500">*</span>}
        </Label>
      </div>
    </Fragment>
  );
}
