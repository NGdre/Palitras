import { useState, useEffect, useCallback } from "react";
import axios, { AxiosPromise, CancelTokenSource } from "axios";
import { forEach } from "p-iteration";
import _ from "lodash";

interface NewFile extends File {
  uploadProgress: number;
  id: number;
  isSuccess: boolean | undefined;
}

type onUploadProgress = (file: NewFile) => (p: ProgressEvent) => void;

export const useFileUpload = (files: [NewFile], endpoint: string) => {
  const [uploadingFiles, setUploadingFiles] = useState<Array<NewFile>>([]);
  const [cancelSources, setCancelSources] = useState<CancelTokenSource[]>([]);
  const [requests, setRequests] = useState<AxiosPromise<any>[]>([]);
  const [isRequesting, setRequesting] = useState(false);

  useEffect(() => {
    const indexFiles = () => {
      if (files.length) {
        setUploadingFiles(
          files.map((file: NewFile, index) => {
            file.id = index;
            return file;
          })
        );
      }
    };

    indexFiles();
  }, [files]);

  const onFileFullFilled = useCallback(
    (index: number, { isSuccess }: { isSuccess: boolean }) => {
      uploadingFiles[index].isSuccess = isSuccess;

      setUploadingFiles([...uploadingFiles]);
    },
    [uploadingFiles]
  );

  const onUploadProgress = useCallback(
    (newFile: NewFile) => (p: ProgressEvent) => {
      const percentage = Math.round((p.loaded * 100) / p.total);
      newFile.uploadProgress = percentage;

      const newFiles = uploadingFiles.filter(
        (file: { name: string }) => file.name !== newFile.name
      );

      setUploadingFiles([...newFiles, newFile]);
    },
    [uploadingFiles]
  );

  useEffect(() => {
    const setRequestingStatus = () => {
      const hasFiles = Boolean(files.length);

      setRequesting(hasFiles);
    };

    setRequestingStatus();
  }, [files]);

  const cancelRequest = (index: number, message: string) => {
    const source = cancelSources[index];

    source.cancel(message);
  };

  const makeRequests = (
    files: NewFile[],
    endpoint: string,
    onUploadProgress: onUploadProgress
  ) => {
    const requests = files.map((file: NewFile) => {
      const formData = new FormData();

      formData.append(
        "picture",
        new Blob([file], { type: file.type }),
        file.name
      );

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return {
        promise: axios({
          method: "post",
          url: endpoint,
          data: formData,
          onUploadProgress: onUploadProgress(file),
          cancelToken: source.token
        }),
        cancelSource: source
      };
    });

    setCancelSources(requests.map(req => req.cancelSource));

    const requestsPromises = requests.map(req => req.promise);

    setRequests(requestsPromises);

    return requestsPromises;
  };

  const upload = useCallback(
    async (
      files: NewFile[],
      endpoint: string,
      {
        onUploadProgress
      }: {
        onUploadProgress: onUploadProgress;
      }
    ) => {
      if (_.isEmpty(uploadingFiles)) return;

      const requests = makeRequests(files, endpoint, onUploadProgress);

      forEach(requests, async (req, index) => {
        const result = await req;

        try {
          if (result) {
            onFileFullFilled(index, { isSuccess: true });
          }
        } catch (error) {
          onFileFullFilled(index, { isSuccess: false });
        }
      });
    },
    [onFileFullFilled, uploadingFiles]
  );

  useEffect(() => {
    const cleanMakeRequest = () => {
      if (isRequesting) {
        setRequesting(false);
      }
    };

    cleanMakeRequest();
  }, [isRequesting]);

  return {
    files: uploadingFiles,

    closeUpload: (index: number, message: string) => {
      cancelRequest(index, message);
    },

    upload: useCallback(() => {
      upload(uploadingFiles, endpoint, {
        onUploadProgress
      });
    }, [onUploadProgress, upload, endpoint, uploadingFiles]),

    isRequesting,
    requests
  };
};
