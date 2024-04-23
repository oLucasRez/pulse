// export function deepMerge(
//   { ...target }: Record<any, any>,
//   ...sources: Record<any, any>[]
// ): Record<any, any> {
//   const extensibleSources: Record<any, any>[] = sources.map((source) =>
//     JSON.parse(JSON.stringify(source)),
//   );

//   for (const source of extensibleSources) {
//     for (const key in source) {
//       if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

//       const sourceValue = source[key];

//       if (sourceValue === undefined) continue;

//       if (Object.prototype.hasOwnProperty.call(target, key)) {
//         if (typeof target[key] === 'object' && typeof sourceValue === 'object')
//           target[key] = deepMerge(target[key], sourceValue);
//         else target[key] = sourceValue;
//       } else target[key] = sourceValue;
//     }
//   }
//   return target;
// }

// interface IIsObject {
//   (item: any): boolean;
// }

// interface IObject {
//   [key: string]: any;
// }

// interface IDeepMerge {
//   (target: IObject, ...sources: Array<IObject>): IObject;
// }

// const isObject: IIsObject = (item: any): boolean => {
//   return typeof item === 'object' && item !== null && !Array.isArray(item);
// };

// export const deepMerge: IDeepMerge = (
//   target: IObject,
//   ...sources: Array<IObject>
// ): IObject => {
//   if (!sources.length) return target;

//   const result: IObject = target;

//   if (isObject(result)) {
//     const len: number = sources.length;

//     for (let i = 0; i < len; i += 1) {
//       const elm: any = sources[i];

//       if (isObject(elm))
//         for (const key in elm) {
//           // eslint-disable-next-line no-prototype-builtins
//           if (elm.hasOwnProperty(key)) {
//             if (isObject(elm[key])) {
//               if (!result[key] || !isObject(result[key])) result[key] = {};
//               deepMerge(result[key], elm[key]);
//             } else {
//               if (Array.isArray(result[key]) && Array.isArray(elm[key]))
//                 result[key] = Array.from(new Set(result[key].concat(elm[key])));
//               else result[key] = elm[key];
//             }
//           }
//         }
//     }
//   }

//   return result;
// };

// export function deepMerge(
//   target: Record<any, any>,
//   ...sources: Record<any, any>[]
// ): Record<any, any> {
//   const merge = (
//     obj1: Record<any, any>,
//     obj2: Record<any, any>,
//   ): Record<any, any> => {
//     for (const key in obj2) {
//       // eslint-disable-next-line no-prototype-builtins
//       if (obj2.hasOwnProperty(key)) {
//         if (obj2[key] instanceof Object && !Array.isArray(obj2[key])) {
//           if (!(key in obj1)) obj1[key] = {};
//           obj1[key] = merge(obj1[key], obj2[key]);
//         } else obj1[key] = obj2[key];
//       }
//     }
//     return obj1;
//   };

//   for (const source of sources) target = merge(target, source);

//   return target;
// }

const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export function deepMerge(
  target: Record<any, any>,
  ...sources: Record<any, any>[]
): Record<any, any> {
  const merge = (
    target: Record<any, any>,
    source: Record<any, any>,
  ): Record<any, any> => {
    for (const key in source)
      if (isObject(target[key]) && isObject(source[key]))
        target[key] = deepMerge(target[key], source[key]);
      else target[key] = source[key];

    return target;
  };

  for (const source of sources) target = merge(target, source);

  return target;
}
