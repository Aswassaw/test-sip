import { Fragment } from "react";
import Dropzone from "react-dropzone";

interface InputPhotoInterface {
  description: string;
  isMultiple: number;
}

export default function InputPhoto(props: InputPhotoInterface) {
  return (
    <Fragment>
      <div className="mb-8">
        <label>{props.description}</label>
        <Dropzone maxSize={2000000} multiple={Boolean(props.isMultiple)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Upload Photo Here</p>
            </div>
          )}
        </Dropzone>
      </div>
    </Fragment>
  );
}
