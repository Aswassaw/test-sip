import { Fragment } from "react";

interface TextChildInterface {
  description: string;
}

export default function TextChild(props: TextChildInterface) {
  return (
    <Fragment>
      <p className={"text-sm mb-20 text-center"}>{props.description}</p>
    </Fragment>
  );
}
