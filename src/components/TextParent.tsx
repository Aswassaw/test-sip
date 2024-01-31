import { Fragment } from "react";

interface TextParentInterface {
  description: string;
  sequence: number;
}

export default function TextParent(props: TextParentInterface) {
  return (
    <Fragment>
      <p
        className={`${
          props.sequence === 1 ? "text-3xl mb-4" : "text-lg mb-6"
        } text-center`}
      >
        {props.description}
      </p>
    </Fragment>
  );
}
