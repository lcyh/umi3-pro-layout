import request from '@/utils/request';

/**
 * 上传文件,带进度条，上传成功后会同步至素材库
 * @param params
 */
export const uploadFile = (
  params: any,
  onUploadProgress?: (progressEvent: any) => void,
): Promise<any> => {
  return request.post('/materialCenter/upload', {
    data: {
      params,
      ...{ timeout: 0, onUploadProgress },
    },
  });
};
