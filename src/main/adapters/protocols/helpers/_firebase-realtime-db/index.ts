export namespace FirebaseRealtimeDBHelper {
  export const encodedNull = 'null-r9rng8bY6d';
  export const encodedArray = 'array-23algw8ga0';
  export const encodedObject = 'object-43yug73ifj';

  export function encodeData(data: Record<any, any>): any {
    if (data === null) return encodedNull;
    else if (Array.isArray(data) && data.length === 0) return encodedArray;
    else if (typeof data === 'object' && Object.keys(data).length === 0)
      return encodedObject;
    else if (Array.isArray(data)) {
      return data.map(encodeData);
    } else if (typeof data === 'object') {
      const encodedObj: Record<any, any> = {};
      for (const key in data) encodedObj[key] = encodeData(data[key]);
      return encodedObj;
    } else return data;
  }

  export function decodeData(data: any): any {
    if (typeof data === 'string') {
      if (data === encodedNull) return null;
      else if (data === encodedArray) return [];
      else if (data === encodedObject) return {};
      else return data;
    } else if (Array.isArray(data))
      return data.map((item: any) => decodeData(item));
    else if (typeof data === 'object' && data !== null) {
      const decodedObj: Record<any, any> = {};
      for (const key in data) decodedObj[key] = decodeData(data[key]);
      return decodedObj;
    } else return data;
  }

  export function parseData<M>(
    snapshot: Record<string, M>,
  ): (M & { id: string })[] {
    return Object.entries(snapshot).map(([id, data]) => ({
      id,
      ...(data as any),
    }));
  }
}
