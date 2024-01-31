import { Fragment } from "react";
import Dropzone from "react-dropzone";

interface InputVideoInterface {
  description: string;
  isMultiple: number;
}

export default function InputVideo(props: InputVideoInterface) {
  return (
    <Fragment>
      <div className="mb-8">
        <label>{props.description}</label>
        <Dropzone maxSize={2000000} multiple={Boolean(props.isMultiple)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Upload Video Here</p>
            </div>
          )}
        </Dropzone>
      </div>
    </Fragment>
  );
}
