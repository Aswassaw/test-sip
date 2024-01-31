import { Fragment, useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner } from "flowbite-react";
import { useListPengerjaan } from "../../hooks/useListPengerjaan";
import {
  ListPengerjaanJsonType,
  ListPengerjaanServiceJsonType,
  ListPengerjaanServiceType,
} from "../../types";
import TextParent from "../../components/TextParent";
import TextChild from "../../components/TextChild";
import InputPhoto from "../../components/InputPhoto";
import InputVideo from "../../components/InputVideo";
import InputCheckbox from "../../components/InputCheckbox";

export default function ListPengerjaanService() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [serviceSelected, setServiceSelected] =
    useState<ListPengerjaanServiceType | null>(null);

  const {
    isLoading,
    isError,
    error,
    data: listPengerjaan,
  } = useListPengerjaan();

  useEffect(() => {
    if (serviceSelected) {
      setOpenModal(true);
    }
  }, [serviceSelected]);

  const filterListServiceJson = (
    serviceJson: ListPengerjaanServiceJsonType,
    index: number
  ) => {
    const result = [];
    const data = serviceJson;

    for (let i = 0; i < data.json.length; i++) {
      if (
        data.json[i].description === "Foto Persyaratan" ||
        data.json[i].description === "TTD Perjanjian" ||
        data.json[i].description === "BPKB"
      ) {
        result.push({
          service: [data.json[i]],
        });
      } else {
        result[result.length - 1].service.push(data.json[i]);
      }
    }

    return result[index];
  };

  return (
    <Fragment>
      <div className="container my-16 mx-auto max-w-2xl">
        <div className="bg-sky-50 px-6 py-12 rounded-md">
          <h1 className="text-center text-3xl font-bold mb-5">
            List Pengerjaan Service
          </h1>
          <p className="mb-3 text-sm">
            Silahkan selesaikan Pengerjaan Service ini, jika sudah selesai klik
            tombol "Order Selesai"
          </p>
          <p className="mb-16 text-center text-red-500">
            * Mandatory (harus dilengkapi)
          </p>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner aria-label="Spinner Loading List Pengerjaan" size="xl" />
            </div>
          ) : (
            <>
              {isError ? (
                <Alert color="failure">{error.message}</Alert>
              ) : (
                <>
                  {listPengerjaan.data.services.map(
                    (service: ListPengerjaanServiceType, index: number) => (
                      <div
                        key={index}
                        className="p-10 font-bold rounded-lg bg-white mb-7 max-w-lg mx-auto shadow-lg cursor-pointer"
                        onClick={() => {
                          setServiceSelected(service);
                          if (serviceSelected) {
                            setOpenModal(true);
                          }
                        }}
                      >
                        <h2>
                          {service.service_name}{" "}
                          <span className="text-red-500">*</span>
                        </h2>
                      </div>
                    )
                  )}

                  <Modal
                    size={"3xl"}
                    dismissible
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                  >
                    <Modal.Header>Service Detail</Modal.Header>
                    <Modal.Body>
                      {listPengerjaan.data.services_json
                        .filter(
                          (service: ListPengerjaanServiceJsonType) =>
                            service.service_id.id === serviceSelected?.id
                        )
                        .map((service: ListPengerjaanServiceJsonType) => (
                          <div>
                            {filterListServiceJson(
                              service,
                              service.service_id.id - 1
                            ).service.map((service: ListPengerjaanJsonType) => (
                              <div key={service.id} className="mx-10">
                                {service.group === "parent" &&
                                  service.type === "text" && (
                                    <TextParent
                                      description={service.description}
                                      sequence={service.sequence}
                                    />
                                  )}
                                {service.group === "child" &&
                                  service.type === "text" && (
                                    <TextChild
                                      description={service.description}
                                    />
                                  )}
                                {service.type === "photo" && (
                                  <InputPhoto
                                    description={service.description}
                                    isMultiple={service.is_multiple}
                                  />
                                )}
                                {service.type === "video" && (
                                  <InputVideo
                                    description={service.description}
                                    isMultiple={service.is_multiple}
                                  />
                                )}
                                {service.type === "checkbox" && (
                                  <InputCheckbox
                                    description={service.description}
                                    mandatory={service.mandatory}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        Back
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
